import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNoEncontradaComponent } from 'src/app/Vistas/pagina-no-encontrada/pagina-no-encontrada.component';

import { AhorcadoComponent } from './Components/ahorcado/ahorcado.component';

const routes: Routes = [
  {
    path:'', 
    children:
    [ 
      { path:'ahorcado', component:AhorcadoComponent },
      { path:'**', component:PaginaNoEncontradaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
