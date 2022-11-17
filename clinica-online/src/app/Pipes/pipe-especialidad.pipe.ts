import { Pipe, PipeTransform } from '@angular/core';
import { Turnos } from '../Entidades/turnos';

@Pipe({
  name: 'pipeEspecialidad'
})
export class PipeEspecialidadPipe implements PipeTransform {

  transform(value: Array<Turnos>, args1:string): any {

    let filtro = args1.split('-');
    let nuevoArray = new Array<Turnos>();
    for(let i = 0; i < value.length; i++)
    {
      switch(filtro[0])
      {
        case 'especialista':
          {
            if(value[i].especialista.nombre == filtro[1])
            {
              nuevoArray.push(value[i]);
            }
          }
          break;
        case 'especialidad':
          {
            if(value[i].especialidad == filtro[1])
            {
              nuevoArray.push(value[i]);
            }
          }
          break;
        case 'fecha':
          {
            if(value[i].fecha == filtro[1])
            {
              nuevoArray.push(value[i]);
            }
          }
          break;
        case 'estado':
          {
            if(value[i].estadoTurno == filtro[1])
            {
              nuevoArray.push(value[i]);
            }
          }
          break;
        case 'paciente':
          {
            if(value[i].paciente.nombre == filtro[1])
            {
              nuevoArray.push(value[i]);
            }
          }
          break;
        default:
          return value;
      }
    }

    return nuevoArray;
  }

}
