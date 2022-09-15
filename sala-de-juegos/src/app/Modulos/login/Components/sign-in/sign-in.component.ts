import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entidades/usuario';

import { AuthService } from 'src/app/Servicios/AuthService/auth.service';

import { Router} from '@angular/router';
import { FirestorageService } from 'src/app/Servicios/FireStorage/firestorage.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public user:Usuario;
  public variableError = false;
  public mensajeError:string;

  constructor(private router: Router, private AuthService: AuthService, private fireStorage:FirestorageService) 
  { 
    this.user = new Usuario();
    this.mensajeError = '';
  }

  ngOnInit(): void 
  {

  }

  ChangePage(routeString:string):void
  {
    this.router.navigate(['/' + routeString]);
  }

  SignIn():void
  {
    console.log(this.user.email);
    this.AuthService.SignIn(this.user.email, this.user.password)
    .then(response=>
      {
        this.fireStorage.AddLog(this.user.email);
        this.ChangePage('home');
        console.log(response);
      })
    .catch(error => 
      {
        this.variableError = true;
        this.mensajeError = "Error when you trying to log in";
        console.log(error)
      });
  }

  AutoComplete(email:string, password:string):void
  {
    this.user.email = email;
    this.user.password = password;
  }
}
