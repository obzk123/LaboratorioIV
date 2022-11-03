import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public opcionHome:string = 'inicio';
  
  constructor(public usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  AsignarIndex(evento:string)
  {
    this.opcionHome = evento;

    console.log(this.opcionHome);
  }

}
