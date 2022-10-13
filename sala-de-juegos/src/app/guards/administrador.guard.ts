import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Servicios/AuthService/auth.service';
import { FirestorageService } from '../Servicios/FireStorage/firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {
  private permitirAcceso:boolean;
  constructor(private auth:AuthService, private firestorage:FirestorageService){
    this.permitirAcceso = false;
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean | Promise<boolean>
  {
    return this.firestorage.getProfile(<string>this.auth.GetDataUser()?.email).then( m =>
      {
        if(m == 'administrador')
        {
          return true;
        }
        else
        {
          return false;
        }
      });
  }
 
}
