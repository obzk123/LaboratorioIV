import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { LoginRoutingModule } from './login-routing.module';
import { IniciarSesionComponent } from './vistas/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './vistas/registrarse/registrarse.component';
import { RecuperarPasswordComponent } from './vistas/recuperar-password/recuperar-password.component';
import { CompartidoModule } from 'src/app/VistasCompartidas/compartido/compartido.module';
import { HomeModule } from '../home/home.module';


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
    CompartidoModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    HomeModule
  ],
  providers: []
})
export class LoginModule { }
