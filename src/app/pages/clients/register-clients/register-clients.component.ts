import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/implementations/client.service';
import { Client } from 'src/app/core/interfaces/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-clients',
  templateUrl: './register-clients.component.html',
  styleUrls: ['./register-clients.component.css'],
})
export class RegisterClientsComponent implements OnInit {
  public client;
  public data_error: any;
  public identity: any;
  nameError: string = '';
  phoneError: string = '';
  emailError: string = '';
  addressError: string = '';

  constructor(private _clientService: ClientService, private router: Router) {
    this.client = new Client('', '', '', '', '');
  }

  ngOnInit(): void {
  }

  validateName() {
    const namePattern: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{1,40}$/;
    if (!namePattern.test(this.client.name)) {
      this.nameError =
        'Los nombres deben contener letras, espacios y acentos (máximo 40 caracteres).';
    } else {
      this.nameError = '';
    }
  }

  validateEmail() {
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.client.email)) {
      this.emailError =
        'El correo debe tener el formato "example@example.com".';
    } else {
      this.emailError = '';
    }
  }

  validatePhone() {
    const phonePattern: RegExp = /^\d{10}$/;
    if (!phonePattern.test(this.client.phone)) {
      this.phoneError = 'El teléfono debe tener 10 dígitos.';
    } else {
      this.phoneError = '';
    }
  }

  validateAddress() {
    const addressPattern: RegExp = /\S/;
    if (!addressPattern.test(this.client.address)) {
      this.addressError =
        'La dirección no puede estar vacía. (máximo 40 caracteres).';
    } else {
      this.addressError = '';
    }
  }

  onSubmit(clientForm: any) {

    if (clientForm.valid) {
      this._clientService
        .post_clientes({
          name: clientForm.value.name,
          phone: clientForm.value.phone,
          email: clientForm.value.email,
          address: clientForm.value.address,
        })
        .subscribe(
          (response) => {
            Swal.fire({
              title: 'Éxito',
              text: `Cliente registrado correctamente`,
              icon: 'success',
              position: 'top-end',
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.client = new Client('', '', '', '', ''); //PARA QUE SE PONGAN EN BLANCO LOS CAMPOS
            this.router.navigate(['clients']);
          },
          (error) => {}
        );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debes rellenar todos los campos!',
        icon: 'error',
        position: 'top-end', // Posición en la parte superior derecha
        toast: true, // Mostrar como toast
        showConfirmButton: false, // No mostrar botón de confirmación
        timer: 3000, // Duración en milisegundos
      });
    }
  }
}
