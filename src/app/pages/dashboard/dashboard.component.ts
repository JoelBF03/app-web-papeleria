import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/core/implementations/client.service';
import { ProductService } from 'src/app/core/implementations/product.service';
import { SaleService } from 'src/app/core/implementations/sale.service';
import { UserService } from 'src/app/core/implementations/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public sales: any;
  public products: any;
  public users: any;
  public clients: any;
  public contadorSales: any = 0;
  public contadorUsers: any = 0;
  public contadorClients: any = 0;
  public contadorProducts: any = 0;

  constructor(
    private _userService: UserService,
    private _productService: ProductService,
    private _salesService: SaleService,
    private _clientService: ClientService
  ) {}

  ngOnInit(): void {
    this._salesService.get_ventas().subscribe(
      (response) => {
        this.sales = response.ventas;
        this.sales.sort((a: any, b: any) => {
          const dateA = new Date(a.fecha).getTime();
          const dateB = new Date(b.fecha).getTime();
          return dateB - dateA;
        });
        this.contadorSales = this.sales.length;
      },
      (error) => {}
    );
    this._productService.get_productos('').subscribe(
      (response) => {
        this.products = response.productos;
        this.contadorProducts = this.products.length;
      },
      (error) => {}
    );
    this._userService.get_users('').subscribe(
      (response) => {
        this.users = response.users;
        this.contadorUsers = this.users.length;
      },
      (error) => {}
    );
    this._clientService.get_clientes('').subscribe(
      (response) => {
        this.clients = response.client;
        this.contadorClients = this.clients.length;
      },
      (error) => {}
    );
  }
}
