import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './Vistas/menu/menu.component';
import { AboutMeComponent } from './Vistas/about-me/about-me.component';
import { HomeComponent } from './Vistas/home/home.component';

const routes: Routes = [
  {path:'', component: MenuComponent},
  {path:'about-me', component:AboutMeComponent},
  {path:'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
