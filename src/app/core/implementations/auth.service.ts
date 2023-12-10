import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url;
  public user;
  public token: any;
  public identity: any;

  constructor(private _http: HttpClient) {
    this.url = environment.url;
    this.user = new User('', '', '', '', '', '', '', '');
  }

  login(user: any, getToken = false): Observable<any> {
    const json = user;

    //COMPROBAMOS SI HAY UN TOKEN O NO
    if (getToken != false) {
      user.gettoken = true; //SI ES NULO PASARÁ A TRUE
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'auth/' + 'login', json, {
      headers: headers,
    });
  }

  //PARA OBTENER EL TOKEN DEL USUARIO
  getToken(): Observable<any> {
    //OBTENEMOS LA LLAVE TOKEN EN EL LOCAL STORAGE
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  //PARA OBTENER LOS DATOS DE UN USUARIO AUTENTICADO
  getIdentity(): Observable<any> {
    //OBTENEMOS LA LLAVE IDENTITY EN EL LOCAL STORAGE
    const identity = JSON.parse(localStorage.getItem('identity') || '[]'); //POR SI ACASO ESTE NULO, NO SE VERA AFECTADA LA APP
    if (identity) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }
}
