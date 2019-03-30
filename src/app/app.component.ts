import { Children } from './../models/children.model';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'My first AGM project';
  // lat: number;
  // lng: number;


  // init = false;

  // chidrens: Children[] = [];
  // siguiendoA: string = null;
  // siguiendoNombre: string = null;

  // dist: any;

  // constructor(db: AngularFirestore) {
  //   db.collection('location')
  //     .valueChanges()
  //     .subscribe((data: Children[]) => {
  //       this.chidrens = data;

  //       if (!this.init) {
  //         this.lat = data[0].lat;
  //         this.lng = data[0].lng;
  //         console.log(data);
  //         this.init = true;
  //       }
  //       if (this.siguiendoA) {
  //         data.forEach(children => {
  //           if (children.id === this.siguiendoA) {
  //             this.lat = children.lat;
  //             this.lng = children.lng;
  //           }
  //         });
  //       }
  //     });
  // }

  // seguir(chidlren: Children) {
  //   console.log(chidlren);
  //   this.siguiendoA = chidlren.id;
  //   this.siguiendoNombre = chidlren.id;

  //   this.lat = chidlren.lat;
  //   this.lng = chidlren.lng;


  //   const a = this.distance(
  //     this.lat,
  //     this.lng,
  //     21.04951910738598,
  //     -86.846923828125
  //   );

  //   if (a < 0.2) {
  //     alert('El niño está fuera de la escuela');
  //   } else {
  //     alert('El niño está en orden');
  //   }
  //   console.log(a);
  // }

  // dejarDeSeguir() {
  //   this.siguiendoA = null;
  //   this.siguiendoNombre = null;
  // }


  // distance(lat1, lon1, lat2, lon2) {
  //   if ((lat1 === lat2) && (lon1 === lon2)) {
  //     return 0;
  //   } else {
  //     const radlat1 = Math.PI * lat1 / 180;
  //     const radlat2 = Math.PI * lat2 / 180;
  //     const theta = lon1 - lon2;
  //     const radtheta = Math.PI * theta / 180;
  //     this.dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //     if (this.dist > 1) {
  //       this.dist = 1;
  //     }
  //     this.dist = Math.acos(this.dist);
  //     this.dist = this.dist * 180 / Math.PI;
  //     this.dist = this.dist * 60 * 1.1515;
  //     this.dist = this.dist * 1.609344;
  //     return this.dist;
  //   }
  // }
}

