import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { IndexClientsComponent } from './pages/clients/index-clients/index-clients.component';
import { EditClientsComponent } from './pages/clients/edit-clients/edit-clients.component';
import { RegisterClientsComponent } from './pages/clients/register-clients/register-clients.component';
import { IndexProductsComponent } from './pages/products/index-products/index-products.component';
import { EditProductsComponent } from './pages/products/edit-products/edit-products.component';
import { RegisterProductsComponent } from './pages/products/register-products/register-products.component';
import { IndexReportsComponent } from './pages/reports/index-reports/index-reports.component';
import { CreateReportsComponent } from './pages/reports/create-reports/create-reports.component';
import { IndexSaleComponent } from './pages/sales/index-sale/index-sale.component';
import { CreateSaleComponent } from './pages/sales/create-sale/create-sale.component';
import { DetalleSaleComponent } from './pages/sales/detalle-sale/detalle-sale.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { IndexUserComponent } from './pages/users/index-user/index-user.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './shared/components/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    IndexClientsComponent,
    EditClientsComponent,
    RegisterClientsComponent,
    IndexProductsComponent,
    EditProductsComponent,
    RegisterProductsComponent,
    IndexReportsComponent,
    CreateReportsComponent,
    IndexSaleComponent,
    CreateSaleComponent,
    DetalleSaleComponent,
    CreateUserComponent,
    IndexUserComponent,
    SidebarComponent,
    PageNotFoundComponent,
    NavComponent,
    DashboardComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
