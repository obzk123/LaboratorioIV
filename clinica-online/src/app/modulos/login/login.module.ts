import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { IniciarSesionComponent } from './vistas/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './vistas/registrarse/registrarse.component';
import { RecuperarPasswordComponent } from './vistas/recuperar-password/recuperar-password.component';
import { CompartidoModule } from 'src/app/VistasCompartidas/compartido/compartido.module';


@NgModule({
  declarations: [
    IniciarSesionComponent,
    RegistrarseComponent,
    RecuperarPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CompartidoModule  
  ]
})
export class LoginModule { }
