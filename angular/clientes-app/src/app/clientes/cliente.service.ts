import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import {formatDate, DatePipe} from '@angular/common';
import {CLIENTES} from './clientes.json';
import {of, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';  //Para mapear el Request
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndpouint:string = 'http://localhost:8083/api/clientes';

  private HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    //Forma sencilla (Casteo al Objeto)
    //return this.http.get<Cliente[]>(this.urlEndpouint);
    //Otra forma (Mapeo al request)
    return this.http.get(this.urlEndpouint).pipe(
      tap(response => {
        console.log("ClienteService tap 1")
        let clientes = response as Cliente[]
        clientes.forEach(
          cliente => {
            console.log(cliente.nombre)

          }
        )
      }),
      map(response => {
        let clientes = response as Cliente[]
        return clientes.map(cliente=>{
          cliente.nombre = cliente.nombre.toUpperCase()

          //Otra forma de conversion de fecha (usando DatePipe)
          let datePipe = new DatePipe('es')
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')

          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US')
          return cliente
        })
      }), //Equivalente a map(function(response){return response as Cliente[]});
      tap(response => {
        console.log("ClienteService tap 2")
        response.forEach(
          cliente => {
            console.log(cliente.nombre)
          }
        )
      })
    );
  }

  create(cliente:Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndpouint, cliente, {headers: this.HttpHeaders} )
    .pipe(
      map ((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (e.status==400) {
          console.error(e.error.errors);
          return throwError(e);
        }

          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpouint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  update(cliente:Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndpouint}/${cliente.id}`, cliente, {headers: this.HttpHeaders})
    .pipe(
      catchError(e => {
        if (e.status==400) {
          throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpouint}/${id}`, {headers: this.HttpHeaders})
      .pipe(
        catchError(e=> {
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      )
  }
}
