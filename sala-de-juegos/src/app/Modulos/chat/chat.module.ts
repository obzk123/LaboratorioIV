import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ComponentePrincipalComponent } from './components/componente-principal/componente-principal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ComponentePrincipalComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }
