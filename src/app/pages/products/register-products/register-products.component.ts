import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/implementations/product.service';
import { Article } from 'src/app/core/interfaces/article';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css'],
})
export class RegisterProductsComponent implements OnInit {
  public producto;
  public data_error: any;
  public identity: any;
  nameError: string = '';
  stockError: string = '';
  priceError: string = '';

  constructor(private _productService: ProductService, private router: Router) {
    this.producto = new Article('', '', 1, 1); //SI ES UN NUMERO SE COLOCA UN 1
    // this.identity = this._userService.getIdentity();
    // this._uploadScriptService.Upload(['validacionProducto']);
  }

  ngOnInit(): void {
    // if (this.identity.role == 'ADMIN') {
    // } else {
    //   this.router.navigate(['']);
    // }
  }

  validateName() {
    const namePattern: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{1,40}$/;
    if (!namePattern.test(this.producto.name)) {
      this.nameError =
        'Los nombres deben contener letras, espacios y acentos (máximo 40 caracteres).';
    } else {
      this.nameError = '';
    }
  }

  validateStock() {
    const stockPattern: RegExp = /^[0-9]+$/;
    if (!stockPattern.test(this.producto.stock.toString())) {
      this.stockError = 'El stock debe ser un número entero.';
    } else {
      this.stockError = '';
    }
  }

  validatePrice() {
    const pricePattern: RegExp = /^\d+(\.\d{1,2})?$/;
    if (!pricePattern.test(this.producto.price.toString())) {
      this.priceError = 'El precio debe ser un número con hasta dos decimales.';
    } else {
      this.priceError = '';
    }
  }

  onSubmit(productoForm: any) {
    if (productoForm.valid) {
      this._productService
        .post_producto({
          name: productoForm.value.name,
          stock: productoForm.value.stock,
          price: productoForm.value.price,
        })
        .subscribe(
          (response) => {
            Swal.fire({
              title: 'Éxito',
              text: `Producto registrado correctamente!`,
              icon: 'success',
              position: 'top-end',
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.producto = new Article('', '', 1, 1); //PARA QUE SE PONGAN EN BLANCO LOS CAMPOS
            this.router.navigate(['products']);
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
