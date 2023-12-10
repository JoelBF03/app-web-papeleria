import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/implementations/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public identity: any;
  public token: any;

  constructor(private _authService: AuthService, private _router: Router) {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
  }

  ngOnInit(): void {}

  logout() {
    //PARA CERRAR SESION SIMPLEMENTE SE DESTRUYE O REMUEVE LA LLAVES IDENTITY Y TOKEN
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    //PONEMOS VACIAS LAS LLAVES
    this.identity = null;
    this.token = null;

    //REDIRECCIONAMOS AL LOGIN
    this._router.navigate(['']);
  }
}
