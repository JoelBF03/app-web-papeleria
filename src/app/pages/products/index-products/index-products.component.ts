import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/implementations/auth.service';
import { ProductService } from 'src/app/core/implementations/product.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-products',
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css'],
})
export class IndexProductsComponent implements OnInit {
  public products: any;
  public filtroText: any;
  public identity: any;
  public p: any;
  public producto_stockText: any;
  public producto_id: any;

  constructor(
    private _productService: ProductService,
    private router: Router,
    private _authService: AuthService
  ) {
    this.identity = _authService.getIdentity();
  }

  ngOnInit(): void {
    this._productService.get_productos('').subscribe(
      (response) => {
        this.products = response.productos;
      },
      (error) => {
        Swal.fire({
          title: 'Éxito',
          text: `Error al obtener los productos`,
          icon: 'error',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }

  search(searchForm: { value: { filtro: any } }) {
    this._productService.get_productos(searchForm.value.filtro).subscribe(
      (response) => {
        this.products = response.productos;
      },
      (error) => {}
    );
  }

  eliminarProducto(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger mx-3',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Seguro quieres eliminar el producto?',
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
            text: `Producto eliminado correctamente!`,
            icon: 'success',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
          });

          this._productService.eliminar_producto(id).subscribe(
            (response) => {
              this._productService.get_productos('').subscribe(
                (response) => {
                  this.products = response.productos;
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

  aumentar_stock(stockForm: any) {
    if (stockForm.valid) {
      if (this.producto_stockText < 1) {
        Swal.fire({
          title: 'Éxito',
          text: `La cantidad a aumentar no puede ser menor a 1`,
          icon: 'error',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (this.producto_id) {
        this._productService
          .act_stock({
            _id: this.producto_id,
            stock: stockForm.value.producto_stock,
          })
          .subscribe((response) => {
            Swal.fire({
              title: 'Éxito',
              text: `Stock actualizado correctamente`,
              icon: 'success',
              position: 'top-end',
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this._productService.get_productos('').subscribe((response) => {
              this.products = response.productos;
            });
          });
      }
    } else {
      Swal.fire({
        title: 'Éxito',
        text: `Revisa los campos del formulario!`,
        icon: 'success',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
}
