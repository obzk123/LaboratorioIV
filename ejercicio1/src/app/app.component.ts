import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejercicio1';

  public edadUno:number;
  public edadDos:number;

  public suma:number;
  public promedio:number;

  constructor() {
    this.edadUno = 0;
    this.edadDos = 0;

    this.suma = 0;
    this.promedio = 0;
  }

  public Calcular():void
  {
    this.suma = this.edadUno + this.edadDos;
    this.promedio = this.suma / 2;
  }

  public LimpiarValores():void
  {
    this.edadUno = 0;
    this.edadDos = 0;
    this.suma = 0;
    this.promedio = 0;
  }
}
