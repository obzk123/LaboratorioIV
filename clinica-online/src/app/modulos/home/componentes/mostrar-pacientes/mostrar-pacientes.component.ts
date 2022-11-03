import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paciente } from 'src/app/Entidades/usuario';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-mostrar-pacientes',
  templateUrl: './mostrar-pacientes.component.html',
  styleUrls: ['./mostrar-pacientes.component.css']
})
export class MostrarPacientesComponent implements OnInit {

  public pacientes = new Array<Paciente>();
  @Output() paciente = new EventEmitter<Paciente>();
  constructor(private usuariosServices:UsuariosService) { }

  ngOnInit(): void {
    this.CargarPacientes();
  }

  public Seleccionar(paciente:Paciente)
  {
    this.paciente.emit(paciente);
  }

  public Volver()
  {
    this.paciente.emit(undefined);
  }

  public CargarPacientes()
  {
    for(let i = 0; i < this.usuariosServices.usuarios.length; i++)
    {
      let user = this.usuariosServices.usuarios[i];
      if(user['obraSocial'])
      {
        this.pacientes.push(user);
      }
    }
  }

}
