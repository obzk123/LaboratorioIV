import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { SignUpComponent } from 'src/app/Modulos/login/Components/sign-up/sign-up.component';
import { SignInComponent } from 'src/app/Modulos/login/Components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from 'src/app/Modulos/login/Components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
  ],
  exports: []
})

export class LoginModule { 
  
}
