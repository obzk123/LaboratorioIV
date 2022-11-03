import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/Entidades/turnos';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  public volver:boolean = false;
  public opcion:string = '';
  public nuevoEstado:string = '';

  constructor(public UsuarioService:UsuarioService, public turnosServicios:TurnosService, private fireStorage:FirestorageService) { 
  }

  CambiarEstado(turno:Turnos, valor:string)
  {
    this.fireStorage.CambiarEstadoTurno(turno, valor).then( (resultado:boolean) =>
      {
        if(resultado)
        {
          turno.estadoTurno = valor;
        }
      });
  }

  public EventoVolver(valor:boolean, turno:Turnos)
  {
    if(valor)
    {
      this.CambiarEstado(turno, this.nuevoEstado);
    }
    this.volver = false;
  }

  public SetComentarioResenia(valor:string, nuevoEstado:string)
  {
    this.opcion = valor;
    this.volver = true;
    this.nuevoEstado = nuevoEstado;
  }

  ngOnInit(): void {
  }

}
