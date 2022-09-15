import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';


import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { PaginaNoEncontradaComponent } from 'src/app/Vistas/pagina-no-encontrada/pagina-no-encontrada.component';

const routes: Routes = [
  {
    path: '', 
    children:
    [
      {path:'sign-in', component:SignInComponent},
      {path:'sign-up', component:SignUpComponent},
      {path:'forgot-password', component:ForgotPasswordComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class LoginRoutingModule { }
