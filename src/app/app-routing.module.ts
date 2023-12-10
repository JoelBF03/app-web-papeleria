import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { IndexClientsComponent } from './pages/clients/index-clients/index-clients.component';
import { IndexUserComponent } from './pages/users/index-user/index-user.component';
import { IndexProductsComponent } from './pages/products/index-products/index-products.component';
import { IndexReportsComponent } from './pages/reports/index-reports/index-reports.component';
import { IndexSaleComponent } from './pages/sales/index-sale/index-sale.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterProductsComponent } from './pages/products/register-products/register-products.component';
import { EditProductsComponent } from './pages/products/edit-products/edit-products.component';
import { RegisterClientsComponent } from './pages/clients/register-clients/register-clients.component';
import { EditClientsComponent } from './pages/clients/edit-clients/edit-clients.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { CreateSaleComponent } from './pages/sales/create-sale/create-sale.component';
import { DetalleSaleComponent } from './pages/sales/detalle-sale/detalle-sale.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: IndexProductsComponent },
  { path: 'users', component: IndexUserComponent },
  { path: 'clients', component: IndexClientsComponent },
  { path: 'reports', component: IndexReportsComponent },
  { path: 'sales', component: IndexSaleComponent },

  //REGISTRO
  { path: 'products/new-product', component: RegisterProductsComponent },
  { path: 'clients/new-client', component: RegisterClientsComponent },
  { path: 'users/new-user', component: CreateUserComponent },
  { path: 'sales/new-sale', component: CreateSaleComponent },

  //EDICION
  { path: 'products/edit-product/:id', component: EditProductsComponent },
  { path: 'clients/edit-client/:id', component: EditClientsComponent },
  { path: 'users/edit-user/:id', component: EditUserComponent },

  //DETALLE
  { path: 'sales/view-details/:id', component: DetalleSaleComponent },

  //404
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
