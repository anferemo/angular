import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().pipe(
      tap(clientes => {
        console.log("ClientesComponent tap 3")
        clientes.forEach(
          cliente => {
            console.log(cliente.nombre)
          })
      })
    ).subscribe(
      /*function (clientes) {
        this.clientes = clientes
      }*/
      clientes => this.clientes = clientes
    );
  }

  delete(cliente:Cliente):void {
    const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
    title: 'Esta Seguro?',
    text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Eliminar',
    cancelButtonText: 'No, Cancelar!',
    reverseButtons: true
    }).then((result) => {
    if (result.value) {
      this.clienteService.delete(cliente.id).subscribe(
        response => {
          this.clientes = this.clientes.filter(cli => cli!== cliente)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `El cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado con éxito`,
            'success'
          )
        }
      )

    } else if (
      // Read more about handling dismissals
      result.dismiss === swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'El cliente no ha sido eliminado',
        'error'
      )
    }
    })
  }

}
