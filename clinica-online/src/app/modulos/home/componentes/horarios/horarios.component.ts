import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Horarios } from 'src/app/Entidades/horarios';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  @Output() eventoSalir = new EventEmitter<boolean>();
  public formHorarios:FormGroup;
  public horarios:Horarios;
  public dias = new Array<string>('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado');
  public checks = new Array<boolean>(6);

  constructor(private fireStorage:FirestorageService, private usuarioService:UsuarioService) { 
    this.formHorarios = new FormGroup({});
    this.horarios = new Horarios();
    this.checks.fill(false);
    this.CrearFormulario();
    this.ObtenerHorarios();
  }

  ngOnInit(): void {
  }

  public CrearFormulario()
  {
    let aux = 0;
    let agregado = 'Inicio';
    for(let i = 0; i < 24; i++)
    {
      if(aux == 6)
      {
        aux = 0;
        switch(agregado)
        {
          case 'Inicio':
            agregado = 'InicioMinutos';
          break;
          
          case 'InicioMinutos':
            agregado = 'Fin';
          break;

          case 'Fin':
            agregado = 'FinMinutos';
          break;
        }
      }
      this.formHorarios.addControl(this.dias[aux] + agregado, new FormControl({value: '', disabled:true}, [Validators.required]));
      aux++;
    }
  }

  public VerificarHoras(): boolean
  {
    for(let i = 0; i < 6; i++)
    {
      if(this.formHorarios.controls[this.dias[i] + 'Inicio'].enabled && this.formHorarios.controls[this.dias[i] + 'Fin'].enabled && this.formHorarios.controls[this.dias[i] + 'Inicio'].value > this.formHorarios.controls[this.dias[i] + 'Fin'].value )
      {
        return false;
      }
    }
    return true;
  }

  public ObtenerHorarios()
  {
    this.fireStorage.ObtenerHorarioPorID(this.usuarioService.usuario.id).then( (horarios:Horarios | any) =>
      {
          if(horarios)
          {
            this.horarios = horarios;
            let arrayHorarios = new Array<string>();
            arrayHorarios.push(this.horarios.lunes);
            arrayHorarios.push(this.horarios.martes);
            arrayHorarios.push(this.horarios.miercoles);
            arrayHorarios.push(this.horarios.jueves);
            arrayHorarios.push(this.horarios.viernes);
            arrayHorarios.push(this.horarios.sabado);

            let aux = 0;
            let agregado = 'Inicio';
            
            for(let i = 0; i < 24; i++)
            {
              if(aux == 6)
              {
                aux = 0;
                switch(agregado)
                {
                  case 'Inicio':
                    agregado = 'InicioMinutos';
                  break;
                  
                  case 'InicioMinutos':
                    agregado = 'Fin';
                  break;

                  case 'Fin':
                    agregado = 'FinMinutos';
                  break;
                }
              }

              let valor = arrayHorarios[aux].split('-');
              let valorInicio = valor[0].split(':');
              let valorFin = valor[1].split(':');

              if(agregado == 'Inicio')
              {
                this.formHorarios.controls[this.dias[aux] + agregado].setValue(valorInicio[0]);
              }else if(agregado == 'InicioMinutos')
              {
                this.formHorarios.controls[this.dias[aux] + agregado].setValue(valorInicio[1]);
              }else if(agregado == 'Fin')
              {
                this.formHorarios.controls[this.dias[aux] + agregado].setValue(valorFin[0]);
              }else if(agregado == 'FinMinutos')
              {
                this.formHorarios.controls[this.dias[aux] + agregado].setValue(valorFin[1]);
              }

              aux++;
            }
          }
      });
  }

  public Confirmar()
  {
    if(this.formHorarios.valid && this.VerificarHoras())
    {
      this.horarios.lunes =       this.formHorarios.controls['LunesInicio'].value + ':' + this.formHorarios.controls['LunesInicioMinutos'].value;
      this.horarios.martes  =     this.formHorarios.controls['MartesInicio'].value + ':' + this.formHorarios.controls['MartesInicioMinutos'].value;
      this.horarios.miercoles =   this.formHorarios.controls['MiercolesInicio'].value + ':' + this.formHorarios.controls['MiercolesInicioMinutos'].value;
      this.horarios.jueves =      this.formHorarios.controls['JuevesInicio'].value + ':' + this.formHorarios.controls['JuevesInicioMinutos'].value;
      this.horarios.viernes =     this.formHorarios.controls['ViernesInicio'].value + ':' + this.formHorarios.controls['ViernesInicioMinutos'].value;
      this.horarios.sabado =      this.formHorarios.controls['SabadoInicio'].value + ':' + this.formHorarios.controls['SabadoInicioMinutos'].value;

      this.horarios.lunes +=      '-' + this.formHorarios.controls['LunesFin'].value + ':' + this.formHorarios.controls['LunesFinMinutos'].value;
      this.horarios.martes  +=    '-' + this.formHorarios.controls['MartesFin'].value + ':' + this.formHorarios.controls['MartesFinMinutos'].value;
      this.horarios.miercoles +=  '-' + this.formHorarios.controls['MiercolesFin'].value + ':' + this.formHorarios.controls['MiercolesFinMinutos'].value;
      this.horarios.jueves +=     '-' + this.formHorarios.controls['JuevesFin'].value + ':' + this.formHorarios.controls['JuevesFinMinutos'].value;
      this.horarios.viernes +=    '-' + this.formHorarios.controls['ViernesFin'].value + ':' + this.formHorarios.controls['ViernesFinMinutos'].value;
      this.horarios.sabado +=     '-' + this.formHorarios.controls['SabadoFin'].value + ':' + this.formHorarios.controls['SabadoFinMinutos'].value;

      this.fireStorage.GuardarHorarios(this.usuarioService.usuario.id, this.horarios).then(ok =>
        {
          if(ok)
          {
            this.Salir();
          }
        });
    }else
    {
      console.log("Faltan datos")
    }
  }

  public Salir()
  {
    this.eventoSalir.emit(true);
  }

  public CambiarValor(id:number, control:string)
  {
    this.checks[id] = !this.checks[id];
    if(this.checks[id])
    {
      this.formHorarios.controls[control + 'Inicio'].enable();
      this.formHorarios.controls[control + 'InicioMinutos'].enable();
      this.formHorarios.controls[control + 'Fin'].enable();
      this.formHorarios.controls[control + 'FinMinutos'].enable();
    }
    else
    {
      this.formHorarios.controls[control + 'Inicio'].disable();
      this.formHorarios.controls[control + 'InicioMinutos'].disable();
      this.formHorarios.controls[control + 'Fin'].disable();
      this.formHorarios.controls[control + 'FinMinutos'].disable();
    }
  }
}
