import { Injectable } from '@angular/core';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuarios = new Array<any>();
  constructor(private fireStorage:FirestorageService) { 
    this.fireStorage.getProfiles().then(m=>
      {
        this.usuarios = m;
        console.log(this.usuarios);
      })
  }

}
