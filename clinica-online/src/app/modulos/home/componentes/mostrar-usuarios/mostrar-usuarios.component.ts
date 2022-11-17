import { Component, Input, Output, EventEmitter} from '@angular/core';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.css']
})
export class MostrarUsuariosComponent {

  public nombreBuscar = '';
  @Output() eventoSalir = new EventEmitter<number>();

  constructor(public usuarios:UsuariosService)
  {
    
  }

  public Seleccionar(usuario:any)
  {
    this.eventoSalir.emit(usuario);
  }

  public Volver()
  {
    this.eventoSalir.emit(undefined);
  }

}
