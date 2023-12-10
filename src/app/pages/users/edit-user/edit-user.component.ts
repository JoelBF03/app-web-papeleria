import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/implementations/user.service';
import { User } from 'src/app/core/interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  public user;
  public data_error: any;
  public identity: any;
  public id: any;
  nameError: string = '';
  usernameError: string = '';
  phoneError: string = '';
  emailError: string = '';
  addressError: string = '';
  roleError: string = '';
  passwordError: string = '';

  constructor(
    private _userService: UserService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this.user = new User('', '', '', '', '', '', '', '');
    // this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    // if (this.identity.role == 'ADMIN') {
    // } else {
    //   this.router.navigate(['']);
    // }
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);

      this._userService.get_user(this.id).subscribe(
        (response) => {
          console.log(response);

          this.user = response.user;
        },
        (error) => {}
      );
    });
  }

  validateName() {
    const namePattern: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s]{1,40}$/;
    if (!namePattern.test(this.user.name)) {
      this.nameError =
        'Los nombres deben contener letras, espacios y acentos (máximo 40 caracteres).';
    } else {
      this.nameError = '';
    }
  }

  validateUsername() {
    const usernamePattern: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s]{1,40}$/;
    if (!usernamePattern.test(this.user.username)) {
      this.usernameError =
        'Los nombres deben contener letras, números, espacios y acentos (máximo 40 caracteres).';
    } else {
      this.usernameError = '';
    }
  }

  validateEmail() {
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.user.email)) {
      this.emailError =
        'El correo debe tener el formato "example@example.com".';
    } else {
      this.emailError = '';
    }
  }

  validatePhone() {
    const phonePattern: RegExp = /^\d{10}$/;
    if (!phonePattern.test(this.user.phone)) {
      this.phoneError = 'El teléfono debe tener 10 dígitos.';
    } else {
      this.phoneError = '';
    }
  }

  validateAddress() {
    const addressPattern: RegExp = /\S/;
    if (!addressPattern.test(this.user.address)) {
      this.addressError =
        'La dirección no puede estar vacía. (máximo 40 caracteres).';
    } else {
      this.addressError = '';
    }
  }

  validateRole() {
    if (!this.user.role || this.user.role === '') {
      this.roleError = 'Por favor, selecciona un rol.';
    } else {
      this.roleError = '';
    }
  }

  onSubmit(userForm: any) {
    if (userForm.valid) {
      this._userService
        .put_user({
          _id: this.id,
          name: userForm.value.name,
          username: userForm.value.username,
          phone: userForm.value.phone,
          email: userForm.value.email,
          address: userForm.value.address,
          role: userForm.value.role,
        })
        .subscribe(
          (response) => {
            Swal.fire({
              title: 'Éxito',
              text: `Usuario actualizado correctamente`,
              icon: 'success',
              position: 'top-end',
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.user = new User('', '', '', '', '', '', '', ''); //PARA QUE SE PONGAN EN BLANCO LOS CAMPOS
            this.router.navigate(['users']);
          },
          (error) => {}
        );
    } else {
      Swal.fire({
        title: 'Éxito',
        text: `Rellena todos los campos del formulario!`,
        icon: 'error',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
}
