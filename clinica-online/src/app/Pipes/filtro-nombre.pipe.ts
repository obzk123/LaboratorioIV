import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../Entidades/usuario';

@Pipe({
  name: 'filtroNombre'
})
export class FiltroNombrePipe implements PipeTransform {

  transform(value: Array<Usuario>, args1: string): Array<Usuario> {
    let nuevoArray = new Array<Usuario>();
    
    if(args1 == '')
    {
      return value;
    }
    nuevoArray = value.filter(s => 
      {
        let nombreCompleto = (s.nombre + ' ' + s.apellido).toLowerCase();
        return nombreCompleto.includes(args1.toLowerCase());
      });
    return nuevoArray;
  }

}
