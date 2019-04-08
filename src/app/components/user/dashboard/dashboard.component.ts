import { Observable, interval, Subscription } from 'rxjs';
import { Children } from './../../../../models/children.model';
import { UserauthService } from './../../../services/user/userauth.service';
import { FirebaseUserModel } from './../../../../models/userFirebase.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, share } from 'rxjs/operators';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import swal from 'sweetalert';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profile: any;
  profileDoc: AngularFirestoreDocument<any>;
  closeResult: string;
  genres = ['Niño', 'Niña'];
  childrenForm: FormGroup;
  error_messages: any;
  public loading = false;
  latH = 21.158902444779304;
  lngH = -86.81429233481413;
  latS = 21.158902444779304;
  lngS = -86.81429233481413;
  loadMapa = false;
  lat: number;
  lng: number;
  dist: any;
  boyUrl = {
    url: 'assets/icons/boy.svg',
    scaledSize: { height: 55, width: 55 }
  };
  girlUrl = {
    url: 'assets/icons/girl.svg',
    scaledSize: { height: 55, width: 55 }
  };
  homeUrl = {
    url: 'assets/icons/home.svg',
    scaledSize: { height: 43, width: 43 }
  };
  schoolUrl = {
    url: 'assets/icons/school.svg',
    scaledSize: { height: 43, width: 43 }
  };
  init = false;
  hourInS: any;
  hourOutS: any;
  hourInH: any;
  hourOutH: any;

  distances = [];

  clock = interval(1000).pipe(
    map(tick => new Date()),
    share()
  );
  clockSub: Subscription;
  hour;
  mm;
  childrens: Children[] = [];
  siguiendoA: string = null;
  siguiendoNombre: string = null;
  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private modalService: NgbModal,
    private userService: UserauthService,
    private aut:AuthService,
    private router: Router
  ) {
    
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.user = data;
        console.log(this.user);
      }
    });
    this.getUser();
    this.afs
      .collection('users')
      .doc(this.user.email)
      .collection('children')
      .valueChanges()
      .subscribe((data: Children[]) => {
        this.childrens = data;
        if (data.toString() === '') {
          this.lat = 21.158902444779304;
          this.lng = this.lngH;
        } else {
          this.loadMapa = true;
          this.childrens.forEach(element => {
              console.log(
               element.house.hourIn
              );
              if(!element.lat) {
                console.log('No existe aun la ubicacion');

              } else {
                if (
                  element.house.hourIn === '08:00'
                 ) {
                   swal('¡Peligro!', `Tu hijo a salido de la escuela`, 'warning');
                 }
              }
              

          });

          if (!this.init) {
            this.lat = data[0].lat;
            this.lng = data[0].lng;
            console.log(data);
            this.init = true;
          }
          if (this.siguiendoA) {
            data.forEach(children => {
              if (children.id === this.siguiendoA) {
                this.lat = children.lat;
                this.lng = children.lng;
              }
            });
          }
        }
      });
  }

  seguir(children: Children) {
    console.log(children);
    this.siguiendoA = children.id;
    this.siguiendoNombre = children.name;

    this.lat = children.lat;
    this.lng = children.lng;
  }

  dejarDeSeguir() {
    this.siguiendoA = null;
    this.siguiendoNombre = null;
  }

  ngOnInit() {}

  getUser() {
    this.profileDoc = this.afs.collection('users').doc(this.user.email);
    this.profileDoc.valueChanges().subscribe(data => {
      this.profile = data;
      console.log('Profile:', this.profile);
    });
  }

  openWindowCustomClass(content) {
    this.createChildrenForm();
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  createChildrenForm() {
    this.childrenForm = this.formBuilder.group({
      childrenName: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      genre: new FormControl('', Validators.compose([Validators.required])),
      hour: new FormControl('', [Validators.minLength(1)])
    });

    this.error_messages = {
      childrenName: [
        { type: 'required', message: 'El nombre es necesario' },
        {
          type: 'minLength',
          mesaage: 'El nombre no cumple con los caracteres'
        }
      ],
      genre: [{ type: 'required', message: 'El genero es necesario' }]
    };
  }

  mapClicked($event) {
    this.latH = $event.coords.lat;
    this.lngH = $event.coords.lng;
  }

  schoolClicked($event) {
    this.latS = $event.coords.lat;
    this.lngS = $event.coords.lng;
  }

  form(value) {
    this.loading = true;
    if (
      this.latH === 0 ||
      this.latH === 21.158902444779304 ||
      this.lngH === -86.81429233481413 ||
      this.lngH === 0 ||
      this.latS === 0 ||
      this.latS === 21.158902444779304 ||
      this.lngS === -86.81429233481413 ||
      this.lngS === 0
    ) {
      swal('¡Ojo!', `Necesitas seleccionar las ubicaciones`, 'warning');
      this.loading = false;
    } else {
      console.log(value);

      console.log('Housssse: ', this.latH, this.lngH);
      console.log('School: ', this.latS, this.lngS);
      const idC = this.afs.createId();
      const obj = {
        id: idC,
        name: value.childrenName,
        genre: value.genre,
        school: {
          lat: this.latS,
          lng: this.lngS,
          hourIn: this.hourInS,
          hourOut: this.hourOutS
        },
        house: {
          lat: this.latH,
          lng: this.lngH,
          hourIn: this.hourInH,
          hourOut: this.hourOutH
        }
      };

      this.userService.addChildren(this.user.email, obj).then(
        data => {
          this.loading = false;
          swal(
            '¡Se a añadido el hijo!',
            `Número de guia: ${idC}`,
            'success'
          ).then(datas => {
            this.modalService.dismissAll();
          });
        },
        err => {
          console.log(err);
          this.loading = false;
          swal(
            '¡Ops!',
            `Al parecer ocurrió un erro, intenta más tarde`,
            'error'
          ).then(datas => {
            this.modalService.dismissAll();
          });
        }
      );
    }
  }




  trysingOut() {
    this.aut.doLogout().then(
      res => {
        this.router.navigateByUrl('/');
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }

}
