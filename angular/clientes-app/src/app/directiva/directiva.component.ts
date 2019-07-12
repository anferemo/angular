import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent  {
  listaArreglo: string[] = ['TypeScript', 'Javascript', 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;
  constructor() { }

  setHabilitar(): void {
    this.habilitar = !this.habilitar;
  }
}
