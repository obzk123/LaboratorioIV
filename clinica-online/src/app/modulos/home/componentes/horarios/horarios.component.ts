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
        console.log(horarios);
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

              let valor = new Array<string>();
              let valorInicio = new Array<string>();
              let valorFin = new Array<string>();

              if(arrayHorarios[aux] != '')
              {
                valor = arrayHorarios[aux].split('-');
                valorInicio = valor[0].split(':');
                valorFin = valor[1].split(':');
              }

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
    if(this.formHorarios.valid)
    {
      let controls = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
      let valores = [this.horarios.lunes, this.horarios.martes, this.horarios.miercoles, this.horarios.jueves, this.horarios.viernes, this.horarios.sabado];
      
      for(let i = 0; i < 6; i++)
      {
        if(this.formHorarios.controls[controls[i] + 'Inicio'].enabled)
        {
          let valorInicio = this.formHorarios.controls[controls[i] + 'InicioMinutos'].value;
          let valorFin = this.formHorarios.controls[controls[i] + 'FinMinutos'].value;
          if(valorInicio.toString().length < 2)
          {
            valorInicio = '0' + valorInicio;
          }

          if(valorFin.toString().length < 2)
          {
            valorFin = '0' + valorFin;
          }
          valores[i] = this.formHorarios.controls[controls[i] + 'Inicio'].value + ':' + valorInicio + '-' + this.formHorarios.controls[controls[i] + 'Fin'].value + ':' + valorFin;
        }
      }
     
      this.horarios.lunes = valores[0];
      this.horarios.martes = valores[1];
      this.horarios.miercoles = valores[2];
      this.horarios.jueves = valores[3];
      this.horarios.viernes = valores[4];
      this.horarios.sabado = valores[5];

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
