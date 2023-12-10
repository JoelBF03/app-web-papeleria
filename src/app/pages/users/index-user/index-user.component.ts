import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/implementations/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css'],
})
export class IndexUserComponent implements OnInit {
  public users: any;
  public filtroText: any;
  public identity: any;
  public p: any;
  public producto_id: any;

  constructor(private _userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this._userService.get_users('').subscribe(
      (response) => {
        this.users = response.users;
      },
      (error) => {
        Swal.fire({
          title: 'Información',
          text: `No hay usuarios que mostrar!`,
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
    this._userService.get_users(searchForm.value.filtro).subscribe(
      (response) => {
        this.users = response.users;
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
        title: '¿Seguro quieres eliminar el usuario?',
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
            text: `Usuario eliminado correctamente`,
            icon: 'success',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
          });

          this._userService.eliminar_user(id).subscribe(
            (response) => {
              this._userService.get_users('').subscribe(
                (response) => {
                  this.users = response.users;
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

  get_id(id: any) {
    this.producto_id = id;
  }
}
