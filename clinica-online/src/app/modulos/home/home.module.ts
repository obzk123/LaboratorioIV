import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { DashboardModule } from 'src/app/VistasCompartidas/home/dashboard.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ValidarCuentaComponent } from './componentes/validar-cuenta/validar-cuenta.component';
import { HomeComponent } from './componentes/home/home.component';


@NgModule({
  declarations: [
    PerfilComponent,
    ValidarCuentaComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule
  ]
})
export class HomeModule { }
