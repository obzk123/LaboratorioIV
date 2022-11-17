import { Injectable } from '@angular/core';
import { Turnos } from '../Entidades/turnos';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  public turnos = new Array<Turnos>();
  
  constructor(private fireStorage:FirestorageService) { }


  async ObtenerTurnos()
  {
    await this.fireStorage.getTurnos().then(m => 
      {
        if(m != undefined)
        {
          this.turnos = m;
        }
      });

      
  }

  public ObtenerTurnosPorID(id:number) : Array<Turnos>
  {
    let nuevoArray = new Array<Turnos>();
    for(let i = 0; i < this.turnos.length; i++)
    {
      if(this.turnos[i].paciente.id == id)
      {
        nuevoArray.push(this.turnos[i]);
      }
    }
    return nuevoArray;
  }

  public UltimoID() : number
  {
    let auxId = 0;
    for(let i = 0; i < this.turnos.length; i++)
    {
      console.log(this.turnos[i].id);
      if( i == 0 || this.turnos[i].id > auxId)
      {
        auxId = this.turnos[i].id;
      }
    }
    return auxId;
  }
  FiltrarTurnosPorFecha(fecha:string, idEspecialista:number)
  {
    let auxTurnos = new Array<Turnos>();
    for(let i = 0; i < this.turnos.length; i++)
    {
      if(this.turnos[i].especialista.id == idEspecialista && this.turnos[i].fecha == fecha)
      {
        auxTurnos.push(this.turnos[i]);
      }
    }

    return auxTurnos;
  }

  public HorarioDisponible(turnos:Array<Turnos>, horario:string):boolean
  {
    for(let i = 0; i < turnos.length; i++)
    {
      if(turnos[i].hora == horario && turnos[i].estadoTurno == 'esperando decision')
      {
        return false;
      }
    }

    return true;
  }
}
