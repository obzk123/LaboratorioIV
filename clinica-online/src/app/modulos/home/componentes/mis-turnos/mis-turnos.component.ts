import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/Entidades/turnos';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  public volver:boolean = false;
  public opcion:string = '';
  public nuevoEstado:string = '';
  public turnoSeleccionado:Turnos | any;
  public cargarHistoriaClinica = false;
  public filtro:string = '';


  public arrayEspecialistas = new Array<string>();
  public arrayPaciente = new Array<string>();
  public arrayEspecialidades = new Array<string>();
  public arrayFechas = new Array<string>();
  public arrayEstadoTurno= new Array<string>();

  constructor(public UsuarioService:UsuarioService, public turnosServicios:TurnosService, private fireStorage:FirestorageService) { 
  }

  CambiarEstado(turno:Turnos, valor:string)
  {
    this.fireStorage.CambiarEstadoTurno(turno, valor).then( (resultado:boolean) =>
      {
        if(resultado)
        {
          turno.estadoTurno = valor;
        }
      });
  }

  public CambiarValor(event:any, filtro:string)
  {
    this.filtro = filtro + '-' + event.target.value;
  }
  public EventoVolver(valor:boolean)
  {
    if(valor)
    {
      this.CambiarEstado(this.turnoSeleccionado, this.nuevoEstado);
      if(this.nuevoEstado == 'realizado')
      {
        this.cargarHistoriaClinica = true;
      }
    }
    this.volver = false;
  }

  public SetComentarioResenia(valor:string, nuevoEstado:string, turno:Turnos)
  {
    this.opcion = valor;
    this.volver = true;
    this.turnoSeleccionado = turno
    this.nuevoEstado = nuevoEstado;
  }

  ngOnInit(): void {
    if(this.UsuarioService.usuario.validado == true) this.CargarArrayTurnos('especialista');
    else this.CargarArrayTurnos('paciente');
  }

  public CargarArrayTurnos(condicion:string)
  {
    if(condicion == 'paciente')
    {
      for(let i = 0; i < this.turnosServicios.turnos.length; i++)
      {
        if(this.turnosServicios.turnos[i].paciente.id == this.UsuarioService.usuario.id)
        {
          this.ValidarDuplicado(this.arrayEspecialidades,  this.turnosServicios.turnos[i].especialidad);
          this.ValidarDuplicado(this.arrayEspecialistas,  this.turnosServicios.turnos[i].especialista.nombre);
          this.ValidarDuplicado(this.arrayEstadoTurno,  this.turnosServicios.turnos[i].estadoTurno);
          this.ValidarDuplicado(this.arrayFechas, this.turnosServicios.turnos[i].fecha);
        }
      }
    }else
    {
      for(let i = 0; i < this.turnosServicios.turnos.length; i++)
      {
        if(this.turnosServicios.turnos[i].especialista.id == this.UsuarioService.usuario.id)
        {
          this.ValidarDuplicado(this.arrayEspecialidades,  this.turnosServicios.turnos[i].especialidad);
          this.ValidarDuplicado(this.arrayPaciente,  this.turnosServicios.turnos[i].paciente.nombre);
          this.ValidarDuplicado(this.arrayEstadoTurno,  this.turnosServicios.turnos[i].estadoTurno);
          this.ValidarDuplicado(this.arrayFechas, this.turnosServicios.turnos[i].fecha);
        }
      }
    }
  }

  ValidarDuplicado(array:Array<string>, valor:any)
  {
    for(let i = 0; i < array.length; i++)
    {
      if(array[i] == valor)
      {
        return;
      }
    }
    array.push(valor);
  }
}
