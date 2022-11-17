import { Injectable } from '@angular/core';
import { Especialista } from '../Entidades/usuario';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuarios = new Array<any>();
  constructor(private fireStorage:FirestorageService) { }

  public ObtenerUsuarios()
  {
    this.fireStorage.getProfiles().then(m=>
      {
        this.usuarios = m;
      })
  }

  public FiltrarPorEspecialistas() : Array<Especialista>
  {
    let especialistas = new Array<Especialista>();
    for(let i = 0; i < this.usuarios.length; i++)
    {
      if(this.usuarios[i]['especialidad'] != null)
      {
        especialistas.push(this.usuarios[i]);
      }
    }
    return especialistas;
  }

  public BuscarUsuarioPorID(id:number)
  {
    for(let i = 0; i < this.usuarios.length; i++)
    {
      if(this.usuarios[i].id == id)
      {
        return this.usuarios[i];
      }
    }
    return undefined;
  }

}
