import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/implementations/auth.service';
import { ClientService } from 'src/app/core/implementations/client.service';
import { ProductService } from 'src/app/core/implementations/product.service';
import { SaleService } from 'src/app/core/implementations/sale.service';
import { DetalleVenta } from 'src/app/core/interfaces/detalleVenta';
import Swal from 'sweetalert2';

interface HtmlSelectEvent extends Event {
  target: HTMLSelectElement & EventTarget;
}

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css'],
})
export class CreateSaleComponent implements OnInit {
  public identity: any;
  public clientes: any;
  public venta: any = {
    idcliente: '',
  };
  public productos: any;
  public producto: any = {
    stock: '--|--',
  };
  public data_detalle: Array<any> = [];
  public detalle: any = {
    idproducto: '',
  };
  public subtotal = 0;
  public iva = 0;
  public valor_iva = 0.12;
  public total = 0;

  constructor(
    private _authService: AuthService,
    private _productoService: ProductService,
    private _clienteService: ClientService,
    private _ventaService: SaleService,
    private _router: Router
  ) {
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {
    if (
      (this, this.identity.role == 'admin' || this.identity.role == 'vendedor')
    ) {
      this._clienteService.get_clientes('').subscribe((response) => {
        this.clientes = response.client;
      });

      this._productoService.get_productos('').subscribe((response) => {
        this.productos = response.productos;
      });
    } else {
      this._router.navigate(['']);
    }
  }

  onSelect(id: any | HtmlSelectEvent) {
    if (id.target.value) {
      id = id.target.value;

      this._productoService.get_producto(id).subscribe((response) => {
        this.producto = response.producto;
      });
    }
  }

  save_detalle(detalleForm: any) {
    if (detalleForm.valid) {
      //VALIDACION DE QUE LA CANTIDAD NO PUEDE SER MAYOR AL STOCK
      if (detalleForm.value.cantidad < 0) {
        Swal.fire({
          title: 'Éxito',
          text: `La cantidad ingresada no puede ser menor a 0`,
          icon: 'error',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (detalleForm.value.cantidad <= this.producto.stock) {
        this.data_detalle.push({
          idproducto: detalleForm.value.idproducto,
          cantidad: detalleForm.value.cantidad,
          producto: this.producto.name,
          price: this.producto.price,
        });

        this.detalle = new DetalleVenta('', '', null);
        this.producto.stock = '--|--';
        // SUBTOTAL
        this.subtotal =
          this.subtotal +
          parseFloat(this.producto.price) *
            parseFloat(detalleForm.value.cantidad);
        //IVA (descomentar si necesitan iva)
        // this.iva = parseInt((this.subtotal * this.valor_iva).toFixed(2));
        //TOTAL DE VENTA
        // this.total = this.subtotal + this.iva;
        this.total = this.subtotal + 0;
      } else {
        //MENSAJE DE ERROR
        Swal.fire({
          title: 'Éxito',
          text: `La cantidad ingresada no puede superar el stock`,
          icon: 'error',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } else {
      Swal.fire({
        title: 'Éxito',
        text: `Debes seleccionar un producto e ingresar una cantidad!`,
        icon: 'error',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  eliminar(idx: any, price: any, cantidad: any) {
    //CON EL METODO SPLICE BORRAMOS EL REGISTRO AGREGADO
    this.data_detalle.splice(idx, 1);
    //ACTUALIZAMOS EL SUBTOTALL
    this.subtotal = this.subtotal - parseFloat(price) * parseFloat(cantidad);
    //ACTUALIZAMOS EL IVA (descomentar si necesitan iva)
    // this.iva = parseInt((this.subtotal * this.valor_iva).toFixed(2));
    //ACTUALIZAMOS EL TOTAL
    // this.total = this.subtotal + this.iva;
    this.total = this.subtotal + 0;
  }

  onSubmit(ventaForm: any) {
    if (ventaForm.valid || ventaForm.value.idcliente != '') {
      Swal.fire({
        title: '¿Estas seguro que quieres registrar la venta?',
        text: 'No podrás cambiar los datos una vez registrados en el sistema!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, registrar venta!',
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            idcliente: ventaForm.value.idcliente,
            iduser: this.identity._id,
            detalles: this.data_detalle,
            montoTotal: Number(this.total),
          };

          console.log(data);

          //REGISTRO DE VENTA
          this._ventaService.save_venta(data).subscribe(
            (response) => {
              this._router.navigate(['ventas']);
              Swal.fire({
                title: 'Éxito',
                text: `Venta registrada con exito!`,
                icon: 'success',
                position: 'top-end',
                toast: true,
                showConfirmButton: false,
                timer: 3000,
              });
              this._router.navigate(['sales']);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
    } else {
      Swal.fire({
        title: 'Éxito',
        text: `Selecciona un cliente!`,
        icon: 'success',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
}
