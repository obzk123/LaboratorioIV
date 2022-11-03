import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario:any;
  constructor(private auth:AuthService, private fireStorage:FirestorageService) { }

  async ObtenerDatos()
  {
    if(this.auth.GetEmail() != null)
    {
      await this.fireStorage.getProfile(this.auth.GetEmail()).then(m=>
        {
          this.usuario = m;
        });
    }
  }

  CerrarSesion()
  {
    this.auth.SignOut();
    this.usuario = null;
  }
}
