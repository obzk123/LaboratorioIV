import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNoEncontradaComponent } from 'src/app/Vistas/pagina-no-encontrada/pagina-no-encontrada.component';

import { AhorcadoComponent } from './Components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './Components/mayor-menor/mayor-menor.component'
import { MenuComponent } from './Components/menu/menu.component';
import { PreguntadosComponent } from './Components/preguntados/preguntados.component';
import { VelocidadComponent } from './Components/velocidad/velocidad.component';

const routes: Routes = [
  {
    path:'', 
    children:
    [ 
      { path: 'menu', component:MenuComponent },
      { path: 'ahorcado', component:AhorcadoComponent},
      { path: 'mayor-menor', component:MayorMenorComponent},
      { path: 'preguntados', component:PreguntadosComponent},
      { path: 'velocidad', component:VelocidadComponent},
      { path: '**', component:PaginaNoEncontradaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
