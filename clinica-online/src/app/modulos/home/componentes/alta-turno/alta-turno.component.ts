import { Component, OnInit} from '@angular/core';
import { Horarios } from 'src/app/Entidades/horarios';
import { Turnos } from 'src/app/Entidades/turnos';
import { Especialista, Paciente } from 'src/app/Entidades/usuario';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { HorariosServicesService } from 'src/app/Servicios/horarios-services.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {

  private paciente:Paciente | undefined;
  private especialista:Especialista | undefined;

  public especialistaMostrar:string;
  public pacienteMostrar:string;

  public administrador:boolean = false;

  public especialidad:string;

  public mostrarEspecialidades:boolean = false;
  public mostrarEspecialistas:boolean = false;
  public mostrarPacientes:boolean = false;

  private fechaSeleccionada:string = '';
  public horaSeleccionada:string = '';

  public dias = new Array<string>()
  public horarios = new Array<string>();

  constructor(private usuarioService:UsuarioService, 
    private horariosService:HorariosServicesService, 
    private turnosServices:TurnosService,
    private fireStorage:FirestorageService) { 
    this.pacienteMostrar = '';
    this.especialidad = '';
    this.especialistaMostrar = '';
    
  }

  ngOnInit(): void {
    if(this.usuarioService.usuario['administrador'] != true)
    {
      this.paciente = this.usuarioService.usuario;
    }else
    {
      this.administrador = true;
    }
  }

  private CargarDias(especialistaHorarios:Horarios)
  {
    this.horarios = [];
    let diasLaborales = new Array<boolean>(5)
    diasLaborales.fill(true);
    if(especialistaHorarios.lunes == '') diasLaborales[0] = false;
    if(especialistaHorarios.martes == '') diasLaborales[1] = false;
    if(especialistaHorarios.miercoles == '') diasLaborales[2] = false;
    if(especialistaHorarios.jueves == '') diasLaborales[3] = false;
    if(especialistaHorarios.viernes == '') diasLaborales[4] = false;
    if(especialistaHorarios.sabado == '') diasLaborales[5] = false;

    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth();

    for(let i = 0; i < 15; i++)
    {
      if(date.getDay() == 0) { i--; dia++; date.setDate(dia); continue;}
      if(date.getDay() == 1 && diasLaborales[0] == false) { i--; dia++; date.setDate(dia); continue;}
      if(date.getDay() == 2 && diasLaborales[1] == false) { i--; dia++; date.setDate(dia); continue;}
      if(date.getDay() == 3 && diasLaborales[2] == false) { i--; dia++; date.setDate(dia); continue;}
      if(date.getDay() == 4 && diasLaborales[3] == false) { i--; dia++; date.setDate(dia); continue;}
      if(date.getDay() == 5 && diasLaborales[4] == false) { i--; dia++; date.setDate(dia); continue;}
      if(date.getDay() == 6 && diasLaborales[5] == false) { i--; dia++; date.setDate(dia); continue;}

      switch(mes)
      {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
          if(dia > 31)
          {
            dia = 1;
            mes++;
            date.setMonth(mes);
          }
          break;

        case 3:
        case 5:
        case 8:
        case 10:
          if(dia > 30)
          {
            dia = 1;
            mes++;
            date.setMonth(mes);
          }
          break;

        case 1:
          if(dia > 28)
          {
            dia = 1;
            mes++;
            date.setMonth(mes);
          }
          break
        
      }
      this.dias.push(dia + ' de ' + this.mesToString(mes));
      
      dia++;
      date.setDate(dia);
    }
  }

  private mesToString(mes:number) : string
  {
    let mesString = '';
    switch(mes + 1)
    {
      case 1: mesString = "enero";       break;
      case 2: mesString = "febrero";     break;
      case 3: mesString = "marzo";       break;
      case 4: mesString = "abril";       break;
      case 5: mesString = "mayo";        break;
      case 6: mesString = "junio";       break;
      case 7: mesString = "julio";       break;
      case 8: mesString = "agosto";      break;
      case 9: mesString = "septiembre";  break;
      case 10: mesString= "octubre";     break;
      case 11: mesString= "noviembre";   break;
      case 12: mesString= "diciembre";   break;
    }
    return mesString;
  }

  private mesToNumber(mes:string) : string
 {
    let mesNumber = '';
    switch(mes)
    {
      case 'enero': mesNumber = '1'; break;
      case 'febrero': mesNumber = '2'; break;
      case 'marzo': mesNumber = '3';  break;
      case 'abril': mesNumber = '4';  break;
      case 'mayo': mesNumber = '5';  break;
      case 'junio': mesNumber = '6';  break;
      case 'julio': mesNumber = '7';  break;
      case 'agosto': mesNumber = '8';  break;
      case 'septiembre': mesNumber = '9';  break;
      case 'octubre': mesNumber = '10';  break;
      case 'noviembre': mesNumber = '11';  break;
      case 'diciembre': mesNumber = '12';  break;
    }
    return mesNumber;
 }

  public CargarEspecialidad(valor:string)
  {
    this.LimpiarCampos();
    if(valor != '')
    {
      this.especialidad = valor;
    }

    this.mostrarEspecialidades = false;
  }

  public CargarEspecialista(valor:Especialista)
  {
    if(valor)
    {
      this.especialista = valor;
      this.especialistaMostrar = this.especialista.nombre + ' ' + this.especialista.apellido;
      let aux = this.horariosService.FiltrarPorEspecialista(valor);
      
      this.dias = [];
      this.horarios = [];

      this.CargarDias(aux);
    }

    this.mostrarEspecialistas = false;
  }

  public CargarPaciente(valor:Paciente)
  {
    if(valor)
    {
      this.paciente = valor;
      this.pacienteMostrar = this.paciente.nombre + ' ' + this.paciente.apellido;
    }

    this.mostrarPacientes = false;
  }

  public CargarHorarios(fecha:string)
  {
    this.horarios = [];
    if(this.especialista == undefined)
    {
      return;
    }

    let auxFecha = fecha.split(' ');
    fecha = auxFecha[0] + '/' + this.mesToNumber(auxFecha[2]) + '/2022';
    this.fechaSeleccionada = fecha;
    let auxTurnos = this.turnosServices.FiltrarTurnosPorFecha(fecha, this.especialista.id);
    let intervalo = 15;
    let date = new Date();
    
    let fechaSplit = fecha.split('/');
    date.setDate(Number(fechaSplit[0]));
    date.setMonth(Number(fechaSplit[1]) - 1);
    let horario = '';
    
    if(date.getDay() == 1) horario = this.horariosService.FiltrarPorEspecialista(this.especialista).lunes;
    if(date.getDay() == 2) horario = this.horariosService.FiltrarPorEspecialista(this.especialista).martes;
    if(date.getDay() == 3) horario = this.horariosService.FiltrarPorEspecialista(this.especialista).miercoles;
    if(date.getDay() == 4) horario = this.horariosService.FiltrarPorEspecialista(this.especialista).jueves;
    if(date.getDay() == 5) horario = this.horariosService.FiltrarPorEspecialista(this.especialista).viernes;
    if(date.getDay() == 6) horario = this.horariosService.FiltrarPorEspecialista(this.especialista).sabado;

    let horarioSplit = horario.split('-');
    let horaInicial = horarioSplit[0];
    let horaFinal = horarioSplit[1];
    let horaAux = horaInicial;

    let hora = Number(horaAux.split(':')[0]);
    let minutos = Number(horaAux.split(':')[1]);

    for(let i = 0; horaAux != horaFinal; i++)
    {
      let auxHorario;
      if(minutos.toString().length < 2)
      {
        auxHorario = hora.toString() + ':' + '0' + minutos.toString();
      }
      else
      {
        auxHorario = hora.toString() + ':' + minutos.toString();
      }
      
      if(this.turnosServices.HorarioDisponible(auxTurnos, auxHorario))
      {
        this.horarios.push(auxHorario);
      }

      minutos += intervalo;
      if(minutos >= 60)
      {
        minutos -= 60;
        hora++;
      }
      horaAux = auxHorario;
    }
  }

  public async SolicitarTurno()
  {
    if(this.ValidarCampos() && this.especialista != undefined && this.paciente != undefined)
    {
      await this.fireStorage.AgregarTurno(this.turnosServices.UltimoID() + 1, this.especialista, this.paciente, this.especialidad, this.fechaSeleccionada, this.horaSeleccionada).then( (ok:Turnos | undefined) =>
        {
          if(ok != undefined)
          {
            console.log(ok);
            this.turnosServices.turnos.push(ok);
            this.LimpiarCampos();
          }
        });
    }
  }

  private LimpiarCampos()
  {
    this.dias = [];
    this.horarios = [];
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
    this.especialistaMostrar = '';
    this.especialidad = '';
    this.pacienteMostrar = '';
    this.especialista = undefined;

    if(this.administrador)
    {
      this.paciente = undefined;
    }
  }

  private ValidarCampos() : boolean
  {
    if(this.fechaSeleccionada != '' && this.horaSeleccionada != '' && this.especialidad != '' && this.especialistaMostrar != '' && this.especialista != undefined && this.paciente != undefined)
    {
      return true;
    }
    return false;
  }
}
