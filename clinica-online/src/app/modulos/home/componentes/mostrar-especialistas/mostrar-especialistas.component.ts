import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Especialista } from 'src/app/Entidades/usuario';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-mostrar-especialistas',
  templateUrl: './mostrar-especialistas.component.html',
  styleUrls: ['./mostrar-especialistas.component.css']
})
export class MostrarEspecialistasComponent implements OnInit {

  public especialistas = new Array<Especialista>();
  @Input() especialidad:string = '';
  @Output() especialista = new EventEmitter<Especialista>();
  constructor(private usuariosServices:UsuariosService) { }

  ngOnInit(): void {
    this.CargarEspecialistas();
  }

  public Seleccionar(especialista:Especialista)
  {
    this.especialista.emit(especialista);
  }

  public Volver()
  {
    this.especialista.emit(undefined);
  }

  public CargarEspecialistas()
  {
    for(let i = 0; i < this.usuariosServices.usuarios.length; i++)
    {
      let user = this.usuariosServices.usuarios[i];
      if(user['especialidad'])
      {
        for(let j = 0; j < user['especialidad'].length; j++)
        {
          if(user['especialidad'][j] == this.especialidad)
          {
            this.especialistas.push(user);
            break;
          }
        }
      }
    }
  }

}
