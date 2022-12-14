import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './Vistas/about-me/about-me.component';
import { PaginaNoEncontradaComponent } from './Vistas/pagina-no-encontrada/pagina-no-encontrada.component';

import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AdministradorGuard } from './guards/administrador.guard';

const routes: Routes = [
  {
    path:'login', 
    loadChildren: ()=> import('src/app/Modulos/login/login.module').then(m => m.LoginModule),
    ...canActivate(()=> redirectLoggedInTo(['/home']))
  },
  {
    path:'chat',
    loadChildren: ()=> import('src/app/Modulos/chat/chat.module').then(m=>m.ChatModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/']))
  },
  {
    path:'respuestas-encuestas',
    loadChildren: ()=> import('src/app/Modulos/respuesta-encuesta/respuesta-encuesta.module').then(m=>m.RespuestaEncuestaModule),
    canActivate: [AdministradorGuard]
  },
  {
    path:'juegos',
    loadChildren: ()=> import('src/app/Modulos/juegos/juegos.module').then(m => m.JuegosModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/']))
  },
  {
    path:'encuesta',
    loadChildren: ()=> import('src/app/Modulos/encuesta/encuesta.module').then(m => m.EncuestaModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/']))
  },
  {
    path:'about-me',
    component:AboutMeComponent
  },
  {
    path: 'home',
    loadChildren: ()=> import('src/app/Modulos/home/home.module').then(m => m.HomeModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/']))
  },
  {
    path: '',  redirectTo: '/login/sign-in', pathMatch: 'full'
  },
  {
    path:'**',
    component: PaginaNoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
