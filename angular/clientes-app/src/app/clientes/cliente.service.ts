import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import {CLIENTES} from './clientes.json';
import {of, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';  //Para mapear el Request

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndpouint:string = 'http://localhost:8083/api/clientes';
  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    //Forma sencilla (Casteo al Objeto)
    return this.http.get<Cliente[]>(this.urlEndpouint);
    //Otra forma (Mapeo al request)
    /*return this.http.get(this.urlEndpouint).pipe(
      map(response => response as Cliente[] ) //Equivalente a map(function(response){return response as Cliente[]});
    );*/
  }
}
