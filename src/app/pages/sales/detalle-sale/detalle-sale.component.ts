import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/implementations/auth.service';
import { SaleService } from 'src/app/core/implementations/sale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-sale',
  templateUrl: './detalle-sale.component.html',
  styleUrls: ['./detalle-sale.component.css'],
})
export class DetalleSaleComponent implements OnInit {
  public id: any;
  public identity: any;
  public venta: any = {
    //INICIALIZAMOS LAS VARIABLES PARA CORREGIR ERRORES EN CONSOLA
    iduser: '',
    idcliente: '',
  };
  public detalleVenta: any;

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: SaleService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity.role == 'admin' || this.identity.role == 'vendedor') {
      this._route.params.subscribe((params) => {
        this.id = params['id'];

        this._ventaService.get_detalles_venta(this.id).subscribe(
          (response) => {
            this.venta = response.data.venta;
            this.detalleVenta = response.data.detalles;
          },
          (error) => {
            Swal.fire({
              title: 'Éxito',
              text: `Error al obtener el detalle de la venta`,
              icon: 'error',
              position: 'top-end',
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
          }
        );
      });
    } else {
      this._router.navigate(['dashboard']);
    }
  }
}
