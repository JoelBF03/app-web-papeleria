import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  get_users(filtro: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'user/' + 'listUsers/' + filtro, {
      headers: headers,
    });
  }

  post_user(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'user/' + 'newUser', data, {
      headers: headers,
    });
  }

  get_user(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'user/' + 'listUser/' + id, {
      headers: headers,
    });
  }

  put_user(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'user/' + 'updateUser/' + data._id, data, {
      headers: headers,
    });
  }

  eliminar_user(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'user/' + 'deleteUser/' + id, {
      headers: headers,
    });
  }
}
