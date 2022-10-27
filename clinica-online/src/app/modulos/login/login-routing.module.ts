import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './vistas/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './vistas/registrarse/registrarse.component';

const routes: Routes = [
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
  {path: 'registro', component: RegistrarseComponent},
  {path: '', redirectTo:'iniciar-sesion', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
