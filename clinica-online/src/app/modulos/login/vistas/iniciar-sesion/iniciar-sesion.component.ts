import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  public email:string;
  public password:string;
  public cargando:boolean;

  constructor(public auth:AuthService, public fireStorage:FirestorageService, public router:Router) { 
    this.email = '';
    this.password = '';
    this.cargando = false;
  }

  ngOnInit(): void {
  }

  IniciarSesion()
  {
    this.cargando = true;
    this.auth.SignIn(this.email, this.password).then(ok =>
    {
      if(this.auth.ValidateCheckEmail())
      {
        this.fireStorage.getProfile(<string>this.auth.GetDataUser()?.email).then((m:any)=>
          {
            if(m['validado'] == false)
            {
              console.log("Todavia no fuiste valido por un administrador");
              this.auth.SignOut();
              this.cargando = false;
            }
            else
            {
              console.log("Logueado con exito");
              this.router.navigate(['home']);
            }
          });
      }else
      {
        console.log("No logueado porque falta validar email");
        this.cargando = false;
      }
    }).catch(error =>
      {
        console.log(error);
        this.cargando = false;
      });
  }

  SetEmailPassword(email:string, password:string)
  {
    this.email = email;
    this.password = password;
  }



}
