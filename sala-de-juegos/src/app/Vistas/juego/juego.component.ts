import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entidades/usuario';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  public usuario:Usuario;

  constructor() { 

    this.usuario = new Usuario();
  }

  ngOnInit(): void 
  {
    this.usuario.nombre = "Octavio";
    this.usuario.apellido = "Bill Zito";
  }

  cambiarNombre():void
  {
    this.usuario.nombre = "Marcos";
  }

  cambiarApellido():void
  {
    this.usuario.apellido = "Hernan";
  }


}
