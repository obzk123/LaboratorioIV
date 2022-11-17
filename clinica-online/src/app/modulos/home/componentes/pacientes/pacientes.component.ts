import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/Entidades/usuario';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public usuariosAtendidos = new Array<Paciente>();
  public pacienteSeleccionado:Paciente | undefined;
  public mostrarHistoriaClinica = false;
  constructor(private usuarioService:UsuarioService, private usuariosService:UsuariosService, private turnosService:TurnosService) { 
    this.CargarPacientes();
  }

  ngOnInit(): void {
  }

  MostrarHistoria(paciente:Paciente)
  {
    this.pacienteSeleccionado = paciente;
    this.mostrarHistoriaClinica = true;
  }
  
  private CargarPacientes()
  {
    for(let i = 0; i < this.turnosService.turnos.length; i++)
    {
      if(this.usuarioService.usuario.id == this.turnosService.turnos[i].especialista.id && this.turnosService.turnos[i].estadoTurno == 'realizado')
      {
        for(let j = 0; j < this.usuariosService.usuarios.length; j++)
        {
          if(this.usuariosService.usuarios[j].id == this.turnosService.turnos[i].paciente.id)
          {
            if(this.usuariosAtendidos.length == 0)
            {
              this.usuariosAtendidos.push(this.usuariosService.usuarios[j]);
              break;
            }
            else
            {
              let existe = false;
              for(let k = 0; k < this.usuariosAtendidos.length; k++)
              {
                if(this.usuariosAtendidos[k] == this.usuariosService.usuarios[j])
                {
                  existe = true;
                  break;
                }
              }

              if(!existe)
              {
                this.usuariosAtendidos.push(this.usuariosService.usuarios[j]);
              }
            }
            
          }
        }
      }

    }
  }



}
