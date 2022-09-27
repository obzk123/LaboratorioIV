import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNoEncontradaComponent } from 'src/app/Vistas/pagina-no-encontrada/pagina-no-encontrada.component';

import { AhorcadoComponent } from './Components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './Components/mayor-menor/mayor-menor.component'
import { MenuComponent } from './Components/menu/menu.component';

const routes: Routes = [
  {
    path:'', 
    children:
    [ 
      { path:'menu', component:MenuComponent },
      { path:'ahorcado', component:AhorcadoComponent},
      { path:'mayor-menor', component:MayorMenorComponent},
      { path:'**', component:PaginaNoEncontradaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
