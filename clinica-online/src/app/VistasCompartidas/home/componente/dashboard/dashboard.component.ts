import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Servicios/storage.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() public index = new EventEmitter<string>();
  public administrador:boolean = false;
  public especialista:boolean = false;
  public img:any;

  constructor(private route:Router, public usuarioService:UsuarioService) { }

  ngOnInit(): void {
    if(this.usuarioService.usuario['administrador'] == true)
    {
      this.administrador = true;
    }

    if(this.usuarioService.usuario['validado'] == true || this.usuarioService.usuario['validado'] == false)
    {
      this.especialista = true;
    }
  }

  CerrarSesion()
  {
    this.usuarioService.CerrarSesion();
    this.route.navigate(['login']);
  }

  Redirigir(evento:string)
  {
    this.index.emit(evento);
  }

}
