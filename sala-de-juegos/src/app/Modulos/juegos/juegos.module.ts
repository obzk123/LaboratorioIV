import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';

import { AhorcadoComponent } from './Components/ahorcado/ahorcado.component';
import { MenuComponent } from './Components/menu/menu.component';
import { MayorMenorComponent } from './Components/mayor-menor/mayor-menor.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AhorcadoComponent,
    MenuComponent,
    MayorMenorComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
