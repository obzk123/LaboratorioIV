import { Injectable } from '@angular/core';
import { Turnos } from '../Entidades/turnos';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  public turnos = new Array<Turnos>();
  constructor(private fireStorage:FirestorageService) { 
    this.ObtenerTurnos();
  }


  async ObtenerTurnos()
  {
    await this.fireStorage.getTurnos().then(m => 
      {
        this.turnos = m;
        console.log(this.turnos);
      });
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
      if(turnos[i].hora == horario)
      {
        return false;
        break;
      }
    }

    return true;
  }
}
