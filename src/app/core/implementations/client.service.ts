import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  get_clientes(filtro: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'client/' + 'listClients/' + filtro, {
      headers: headers,
    });
  }

  post_clientes(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'client/' + 'newClient', data, {
      headers: headers,
    });
  }

  get_cliente(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'client/' + 'listClient/' + id, {
      headers: headers,
    });
  }

  act_cliente(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(
      this.url + 'client/' + 'updateClient/' + data._id,
      data,
      {
        headers: headers,
      }
    );
  }

  eliminar_cliente(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'client/' + 'deleteClient/' + id, {
      headers: headers,
    });
  }
}
