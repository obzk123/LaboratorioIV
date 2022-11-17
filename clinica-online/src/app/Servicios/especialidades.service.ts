import { Injectable } from '@angular/core';
import { Especialidades } from '../Entidades/especialidades';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  public especialidades = new Array<Especialidades>();
  constructor(private fireStorage:FirestorageService) { }


  public async CargarEspecialidades()
  {
    await this.fireStorage.GetEspecialidades().then(especialidad =>
      {
        if(especialidad != undefined)
        {
          this.especialidades = especialidad;
        }
      });
  }
}
