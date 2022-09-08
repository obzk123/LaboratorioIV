import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entidades/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public usuario:Usuario;

  constructor() 
  { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void 
  {

  }

  Guardar():void
  {
    localStorage.removeItem("usuario");

    if(this.usuario.nombre.length < 3 || this.usuario.apellido.length < 3)
    {
      console.log("Error al guardar");
    }
    else
    {
      localStorage.setItem("usuario", JSON.stringify(this.usuario));
      console.log("Guardado con exito");
    }

  }

  Ingresar():void
  {
    
  }

  MostrarObj():void
  {
    let usr = localStorage.getItem("usuario");
    if(usr)
    {
      console.log(JSON.parse(usr));
    }
    else
    {
      console.log("No hay usuario guardado");
    }
  }

  MostrarJSON():void
  {
    let usr = localStorage.getItem("usuario");
    if(usr)
    {
      console.log(usr);
    }
    else
    {
      console.log("No hay usuario guardado");
    }
  }

}
