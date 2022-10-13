import { NgModule }      from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';
import { Usuario } from 'src/app/Entidades/usuario';
import { MensajeErrorService } from 'src/app/Servicios/MensajeError/mensaje-error.service';
import { FirestorageService } from 'src/app/Servicios/FireStorage/firestorage.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user:Usuario;
  public variableError = false;
  public mensajeError:string;

  constructor(private router:Router, private AuthService:AuthService, private errorMensaje:MensajeErrorService, private fireStore:FirestorageService) {
    this.user = new Usuario();
    this.mensajeError = '';
   }

  ngOnInit(): void {
  }

  ChangePage(routeString:string):void
  {
    this.router.navigate(['/' + routeString]);
  }

  SignUp():void
  {
    this.AuthService.SignUp(this.user.email, this.user.password)
    .then(response=>
      {
        this.fireStore.AgregarUsuario(this.user.email, 'usuario');
        this.ChangePage('login/sign-in');
        console.log("Registrado con exito");
      })
    .catch(error=>
      {
        this.variableError = true;
        this.mensajeError = "Error when you trying sign up";
        //this.errorMensaje.ShowError("Failed to register");
        console.log("Fallo al registrarse");
      });
  }

}

