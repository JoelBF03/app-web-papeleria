import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/implementations/auth.service';
import { User } from 'src/app/core/interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public user;
  public token: any;
  public identity: any;
  public data_error: any;

  constructor(private _authService: AuthService, private _router: Router) {
    this.identity = this._authService.getIdentity();
    this.user = new User('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    if (this.identity.role == 'admin' || this.identity.role == 'vendedor') {
      this._router.navigate(['dashboard']);
    }
  }

  login(loginForm: any) {
    //COMPROBAMOS EL FORMULARIO SEA VÁLIDO
    if (loginForm.valid) {
      this._authService.login(this.user).subscribe(
        (response) => {
          //ALMACENAMOS EL TOKEN EN EL LOCAL STORAGE DEL NAVEGADOR
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this._authService.login(this.user, true).subscribe(
            (response) => {
              localStorage.setItem('identity', JSON.stringify(response.user));
              //LO RETORNAMOS A UNA NUEVA VISTA
              this._router.navigate(['dashboard']);
              Swal.fire({
                title: 'Éxito',
                text: `Bienvenido, ${response.user.name}`,
                icon: 'success',
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timer: 3000,
              });
            },
            (error) => {}
          );
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: (this.data_error = error.error.message),
            icon: 'error',
            position: 'top-end', // Posición en la parte superior derecha
            toast: true, // Mostrar como toast
            showConfirmButton: false, // No mostrar botón de confirmación
            timer: 3000, // Duración en milisegundos
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debes rellenar todos los campos',
        icon: 'error',
        position: 'top-end', // Posición en la parte superior derecha
        toast: true, // Mostrar como toast
        showConfirmButton: false, // No mostrar botón de confirmación
        timer: 3000, // Duración en milisegundos
      });
    }
  }
}
