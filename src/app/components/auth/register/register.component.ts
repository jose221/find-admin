import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  loginForm: FormGroup;
  error_messages = {
    username: [
      { type: 'required', message: 'El usuario es necesario' },
      { type: 'minLength', mesaage: 'El usuario no cumple con los caracteres' },
      { type: 'maxLength', message: 'El usuario tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un usuario valido' }
    ],
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'La contraseña tiene bajos caracteres' },
      {
        type: 'maxLength',
        message: 'La contraseña a pasado el limite de los caracteres'
      },
      {
        type: 'pattern',
        message:
          'Ingresa una contraseña valida, (Un numero, una mayuscula y una miniscula)'
      }
    ],
    confirmPassword: [
      { type: 'required', message: 'Es necesario este campo' },
      { type: 'mustMatch', message: 'Contraseñas diferentes' }
    ]
  };
  constructor(
    public formBuilder: FormBuilder,
    // tslint:disable-next-line:variable-name
    private _authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group(
      {
        username: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
            )
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required])
        )
      },
      {
        validator: this.checkPasswords
      }
    );
  }

  ngOnInit() {}

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  tryRegister(value) {
    this.loading = true;
    this._authService.doRegister(value).then(
      res => {
        this._authService.updateUsername(value.username).then(
          res => {
            console.log(res);
            this._authService.doUserFirestore(value);
            this.loading = false;
            this.router.navigateByUrl('/login');

          },
          err => {
            console.log(err);
            this.loading = false;
            swal(
              '¡Ops!',
              `Al parecer ocurrió un error, intenta más tarde`,
              'error'
            );
          }
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        swal(
          '¡Ops!',
          `Al parecer ocurrió un error, intenta más tarde`,
          'error'
        );
      }
    );
  }
}
