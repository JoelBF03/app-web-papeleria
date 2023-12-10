import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/implementations/auth.service';
import { ClientService } from 'src/app/core/implementations/client.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-clients',
  templateUrl: './index-clients.component.html',
  styleUrls: ['./index-clients.component.css'],
})
export class IndexClientsComponent implements OnInit {
  public clients: any;
  public filtroText: any;
  public identity: any;
  public p: any;

  constructor(
    private _clientService: ClientService,
    private router: Router,
    private _authService: AuthService
  ) {
    this.identity = _authService.getIdentity();
  }

  ngOnInit(): void {
    this._clientService.get_clientes('').subscribe(
      (response) => {
        this.clients = response.client;
      },
      (error) => {
        Swal.fire({
          title: 'Información',
          text: `No hay clientes que mostrar!`,
          icon: 'info',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }

  search(searchForm: { value: { filtro: any } }) {
    this._clientService.get_clientes(searchForm.value.filtro).subscribe(
      (response) => {
        this.clients = response.client;
      },
      (error) => {}
    );
  }

  eliminarUsuario(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger mx-3',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Seguro quieres eliminar el cliente?',
        text: 'No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Éxito',
            text: `Cliente eliminado correctamente`,
            icon: 'success',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
          });
          this._clientService.eliminar_cliente(id).subscribe(
            (response) => {
              this._clientService.get_clientes('').subscribe(
                (response) => {
                  this.clients = response.client;
                },
                (error) => {}
              );
            },
            (error) => {}
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Se canceló la petición',
            'error'
          );
        }
      });
  }
}
