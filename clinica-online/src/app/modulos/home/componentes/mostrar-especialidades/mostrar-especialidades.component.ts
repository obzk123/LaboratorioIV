import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-mostrar-especialidades',
  templateUrl: './mostrar-especialidades.component.html',
  styleUrls: ['./mostrar-especialidades.component.css']
})
export class MostrarEspecialidadesComponent implements OnInit {

  public especialidades = new Array<string>();

  @Output() especialidad = new EventEmitter<string>();

  constructor(public usuariosService:UsuariosService) { 
    this.CargarEspecialidades();
    console.log(this.especialidades);
  }

  ngOnInit(): void {
  }

  public CargarEspecialidades()
  {
    for(let i = 0; i < this.usuariosService.usuarios.length; i++)
    {
      let user = this.usuariosService.usuarios[i];
      if(user['especialidad'])
      {
        for(let j = 0; j < user['especialidad'].length; j++)
        {
          if(j == 0)
          {
            this.especialidades.push(user['especialidad'][j]);
          }

          for(let k = 0; k < this.especialidades.length; k++)
          {
            if(this.especialidades[k] == user['especialidad'][j])
            {
              break;
            }else if(k == this.especialidades.length -1)
            {
              this.especialidades.push(user['especialidad'][j]);
            }
          }
        }
      }
    }
  }

  public Seleccionar(valor:string)
  {
    this.especialidad.emit(valor);
  }

  public Volver()
  {
    this.especialidad.emit('');
  }

}
