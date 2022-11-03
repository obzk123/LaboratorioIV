import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/Entidades/turnos';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  public cancelado:boolean = false;
  constructor(public turnosServicios:TurnosService, private fireStorage:FirestorageService) { }

  ngOnInit(): void {
  }

  public EventoVolver(valor:boolean, turno:Turnos)
  {
    if(valor)
    {
      this.fireStorage.CambiarEstadoTurno(turno, "cancelado").then(ok=>
        {
          if(ok)
          {
            turno.estadoTurno = "cancelado";
          }
        });
    }

    this.cancelado = false;
  }
}
