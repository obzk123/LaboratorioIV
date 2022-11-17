import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/Entidades/turnos';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  public turnoSeleccionado:Turnos | undefined;
  public cancelado:boolean = false;

  public arrayEspecialistas = new Array<string>();
  public arrayPaciente = new Array<string>();
  public arrayEspecialidades = new Array<string>();
  public arrayFechas = new Array<string>();
  public arrayEstadoTurno= new Array<string>();
  public filtro = '';

  constructor(public turnosServicios:TurnosService, private fireStorage:FirestorageService) { }

  ngOnInit(): void {
    this.CargarArrayTurnos();
  }

  public EventoVolver(valor:boolean)
  {
    if(valor && this.turnoSeleccionado != undefined)
    {
      this.fireStorage.CambiarEstadoTurno(this.turnoSeleccionado, "cancelado").then(ok=>
        {
          if(ok && this.turnoSeleccionado != undefined)
          {
            this.turnoSeleccionado.estadoTurno = "cancelado";
          }
        });
    }

    this.cancelado = false;
  }

  public CambiarValor(event:any, filtro:string)
  {
    this.filtro = filtro + '-' + event.target.value;
  }

  public SetearTurno(turno:Turnos)
  {
    this.turnoSeleccionado = turno
    this.cancelado = true;
  }

  public CargarArrayTurnos()
  {
    for(let i = 0; i < this.turnosServicios.turnos.length; i++)
    {
      this.ValidarDuplicado(this.arrayEspecialidades,  this.turnosServicios.turnos[i].especialidad);
      this.ValidarDuplicado(this.arrayEspecialistas,  this.turnosServicios.turnos[i].especialista.nombre);
      this.ValidarDuplicado(this.arrayEstadoTurno,  this.turnosServicios.turnos[i].estadoTurno);
      this.ValidarDuplicado(this.arrayFechas, this.turnosServicios.turnos[i].fecha);
      this.ValidarDuplicado(this.arrayPaciente,  this.turnosServicios.turnos[i].paciente.nombre);
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
