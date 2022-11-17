import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HistoriaClinica} from '../../../../Entidades/historia-clinica'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { Paciente } from 'src/app/Entidades/usuario';
import { PdfService } from 'src/app/Servicios/pdf.service';
import { ExcelService } from 'src/app/Servicios/excel.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';


@Component({
  selector: 'app-cargar-historia-clinica',
  templateUrl: './cargar-historia-clinica.component.html',
  styleUrls: ['./cargar-historia-clinica.component.css']
})
export class CargarHistoriaClinicaComponent implements OnInit {

  @Input() public opcion:string = '';
  @Input() public paciente:Paciente | undefined;
  @Output() public volver = new EventEmitter<boolean>();

  public formHistoriaClinica:FormGroup;
  public historiaClinica:HistoriaClinica | undefined;

  constructor(private fireStorage:FirestorageService, private excelService:ExcelService, private turnos:TurnosService) { 
    this.formHistoriaClinica = new FormGroup({});
  }

  ngOnInit() : void {
    this.CargarHistoriaClinica();
    this.CrearForm();
  }

  public DescargarTurnos()
  {
    if(this.paciente)
    {
      this.excelService.exportAsExcelFile(this.turnos.ObtenerTurnosPorID(this.paciente.id), this.paciente.nombre + this.paciente.apellido);
    }
  }
  async CargarHistoriaClinica()
  {
    if(this.paciente != undefined)
    {
      await this.fireStorage.GetHistoriaClinica(this.paciente.id).then(historia =>
        {
          if(historia != undefined)
          {
            this.historiaClinica = historia;
            this.CargarForm();
          }
        });

        
    }
  }

  private CrearForm()
  {
    this.formHistoriaClinica.addControl('paciente', new FormControl('', [Validators.required]));
    this.formHistoriaClinica.controls['paciente'].disable();
    this.formHistoriaClinica.addControl('altura', new FormControl('', [Validators.required]));
    this.formHistoriaClinica.addControl('peso', new FormControl('', [Validators.required]));
    this.formHistoriaClinica.addControl('temperatura', new FormControl('', [Validators.required]));
    this.formHistoriaClinica.addControl('presion', new FormControl('', [Validators.required]));
    this.formHistoriaClinica.addControl('datosExtras', new FormControl('', [Validators.required]));

    if(this.opcion == 'soloVer')
    {
      this.formHistoriaClinica.controls['altura'].disable();
      this.formHistoriaClinica.controls['peso'].disable();
      this.formHistoriaClinica.controls['temperatura'].disable();
      this.formHistoriaClinica.controls['presion'].disable();
      this.formHistoriaClinica.controls['datosExtras'].disable();
    }
  }

  private CargarForm()
  {
    if(this.paciente != undefined)
    {
      this.formHistoriaClinica.controls['paciente'].setValue(this.paciente.nombre);
    }

    if(this.historiaClinica != undefined)
    {
      this.formHistoriaClinica.controls['altura'].setValue(this.historiaClinica.altura);
      this.formHistoriaClinica.controls['peso'].setValue(this.historiaClinica.peso);
      this.formHistoriaClinica.controls['temperatura'].setValue(this.historiaClinica.temperatura);
      this.formHistoriaClinica.controls['presion'].setValue(this.historiaClinica.presion);
      this.formHistoriaClinica.controls['datosExtras'].setValue(this.historiaClinica.datosExtras);
    }

  }

  public CargarHistoria()
  {
    if(this.formHistoriaClinica.valid && this.paciente != undefined)
    {
      let historiaClinica = new HistoriaClinica(this.paciente.id, this.formHistoriaClinica.controls['altura'].value, this.formHistoriaClinica.controls['peso'].value,this.formHistoriaClinica.controls['temperatura'].value, this.formHistoriaClinica.controls['presion'].value,this.formHistoriaClinica.controls['datosExtras'].value);
      let ok = false;
      if(this.historiaClinica != undefined)
      {
        this.fireStorage.ActualizarHistoriaClinica(historiaClinica).then(ok=>
          {
            if(ok == true)
            {
              console.log("Entro");
              this.Volver();
            }else
            {
              console.log("Ocurrio un error");
            }
          });
      }
      else
      {
        this.fireStorage.AgregarHistoriaClinica(historiaClinica).then(ok=>
          {
            if(ok == true)
            {
              console.log("Entro");
              this.Volver();
            }else
            {
              console.log("Ocurrio un error");
            }
          });
      }                          
    }
    else
    {
      console.log("Faltan datos");
    }
  }

  public Volver()
  {
    this.volver.emit(true);
  }

}