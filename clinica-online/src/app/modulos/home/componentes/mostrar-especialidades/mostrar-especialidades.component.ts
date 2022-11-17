import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Especialidades } from 'src/app/Entidades/especialidades';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-mostrar-especialidades',
  templateUrl: './mostrar-especialidades.component.html',
  styleUrls: ['./mostrar-especialidades.component.css']
})
export class MostrarEspecialidadesComponent implements OnInit {

  @Output() especialidad = new EventEmitter<string>();

  constructor(public usuariosService:UsuariosService, public EspecialidadesServices:EspecialidadesService) { 
    this.EspecialidadesServices.CargarEspecialidades();
  }

  ngOnInit(): void {
  }

  public Seleccionar(valor:string)
  {
    this.especialidad.emit(valor);
  }

  public Volver()
  {
    this.especialidad.emit('');
  }

}
