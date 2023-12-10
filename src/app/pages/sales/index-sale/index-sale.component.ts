import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/implementations/auth.service';
import { SaleService } from 'src/app/core/implementations/sale.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-index-sale',
  templateUrl: './index-sale.component.html',
  styleUrls: ['./index-sale.component.css'],
})
export class IndexSaleComponent implements OnInit {
  public sales: any;
  public filtroText: any;
  public identity: any;
  public p: any;
  filtroFechaInicio: string | null = null;
  filtroFechaFin: string | null = null;

  constructor(
    private _salesService: SaleService,
    private router: Router,
    private _authService: AuthService
  ) {
    this.identity = _authService.getIdentity();
  }

  ngOnInit(): void {
    this._salesService.get_ventas().subscribe(
      (response) => {
        this.sales = response.ventas;
        this.sales.sort((a: any, b: any) => {
          const dateA = new Date(a.fecha).getTime();
          const dateB = new Date(b.fecha).getTime();
          return dateB - dateA;
        });
      },
      (error) => {
        Swal.fire({
          title: 'Información',
          text: `No hay ventas que mostrar!`,
          icon: 'info',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }

  aplicarFiltro(): void {
    // Filtra las ventas según las fechas seleccionadas
    if (this.filtroFechaInicio && this.filtroFechaFin) {
      const fechaInicio = moment(this.filtroFechaInicio).format('YYYY-MM-DD');
      const fechaFin = moment(this.filtroFechaFin).format('YYYY-MM-DD');
      console.log(fechaInicio);
      console.log(fechaFin);

      this.sales = this.sales.filter((venta: any) => {
        const fechaVenta = moment(venta.fecha).format('YYYY-MM-DD');
        return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
      });
    }
  }

  resetearFiltro(): void {
    // Reinicia las fechas del filtro y vuelve a cargar todos los registros
    this.filtroFechaInicio = null;
    this.filtroFechaFin = null;
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    // Recarga todos los registros sin aplicar ningún filtro
    this._salesService.get_ventas().subscribe(
      (response) => {
        this.sales = response.ventas;
        this.sales.sort((a: any, b: any) => {
          const dateA = new Date(a.fecha).getTime();
          const dateB = new Date(b.fecha).getTime();
          return dateB - dateA;
        });
      },
      (error) => {
        Swal.fire({
          title: 'Información',
          text: `No hay ventas que mostrar!`,
          icon: 'info',
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }
}
