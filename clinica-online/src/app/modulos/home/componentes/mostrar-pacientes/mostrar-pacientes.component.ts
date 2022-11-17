import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HistoriaClinica } from 'src/app/Entidades/historia-clinica';
import { Paciente } from 'src/app/Entidades/usuario';
import { ExcelService } from 'src/app/Servicios/excel.service';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-mostrar-pacientes',
  templateUrl: './mostrar-pacientes.component.html',
  styleUrls: ['./mostrar-pacientes.component.css']
})
export class MostrarPacientesComponent implements OnInit {

  @Input() public opcion:string = '';
  public mostrarHistoriaClinica:boolean = false;
  public pacienteSeleccionado:Paciente | undefined;
  public pacientes = new Array<Paciente>();
  @Output() paciente = new EventEmitter<Paciente>();
  constructor(private usuariosServices:UsuariosService, private fireStorageService:FirestorageService, private excelService:ExcelService) { }

  ngOnInit(): void {
    this.CargarPacientes();
  }

  public Descargar()
  {
    this.excelService.exportAsExcelFile(this.pacientes, 'ejemplo');
  }
  
  public Seleccionar(paciente:Paciente)
  {
    if(this.opcion == 'historias-clinicas')
    {
      this.fireStorageService.GetHistoriaClinica(paciente.id).then( (ok:HistoriaClinica | undefined) =>
      {
        if(ok != undefined)
        {
          this.mostrarHistoriaClinica = true;
          this.pacienteSeleccionado = paciente;
        }else
        {
          console.log("Este paciente no tiene historia clinica");
        }
      });

    }
    else
    {
      this.paciente.emit(paciente);
    }
    
  }

  public Volver()
  {
    this.paciente.emit(undefined);
  }

  public CargarPacientes()
  {
    for(let i = 0; i < this.usuariosServices.usuarios.length; i++)
    {
      let user = this.usuariosServices.usuarios[i];
      if(user['obraSocial'])
      {
        this.pacientes.push(user);
      }
    }
  }

}
