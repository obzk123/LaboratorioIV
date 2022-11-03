import { Injectable } from '@angular/core';
import { Horarios } from '../Entidades/horarios';
import { Especialista } from '../Entidades/usuario';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class HorariosServicesService {

  public horarios = new Array<Horarios>();
  constructor(private fireStorage:FirestorageService) { 
    this.fireStorage.ObtenerHorarios().then(ok=>
      {
        if(ok)
        {
          this.horarios = ok;
        }
      })
  }


  FiltrarPorEspecialista(especialista:Especialista) : Horarios
  {
    let auxHorario = new Horarios();
    if(this.horarios != null)
    {
      for(let i = 0; i < this.horarios.length; i++)
      {
        if(this.horarios[i].id == especialista.id)
        {
          auxHorario = this.horarios[i];
          break;
        }
      }
    }
    return auxHorario;
  }
}
