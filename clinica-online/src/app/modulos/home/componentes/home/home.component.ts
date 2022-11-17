import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public opcionHome:string = 'inicio';
  
  constructor(public usuarioService:UsuarioService, private turnosService:TurnosService, private usuariosServices:UsuariosService, private especialidades:EspecialidadesService) { 
    this.usuariosServices.ObtenerUsuarios();
    this.turnosService.ObtenerTurnos();
    this.especialidades.CargarEspecialidades();
  }

  ngOnInit(): void {
  }

  AsignarIndex(evento:string)
  {
    this.opcionHome = evento;

    console.log(this.opcionHome);
  }

}
