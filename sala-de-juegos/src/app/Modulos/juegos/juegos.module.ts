import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';

import { AhorcadoComponent } from './Components/ahorcado/ahorcado.component';
import { MenuComponent } from './Components/menu/menu.component';
import { MayorMenorComponent } from './Components/mayor-menor/mayor-menor.component';
import { FormsModule } from '@angular/forms';
import { PreguntadosComponent } from './Components/preguntados/preguntados.component';
import { JuegoComponent } from './Components/preguntados/hijos/juego/juego.component';
import { VelocidadComponent } from './Components/velocidad/velocidad.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MenuComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    JuegoComponent,
    VelocidadComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
  ]
})
export class JuegosModule { }
