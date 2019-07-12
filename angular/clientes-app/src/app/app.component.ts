import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular'
  curso:string = 'Angular 8 con Spring 5'
  profesor:string = 'Andrés Guzmán'
}
