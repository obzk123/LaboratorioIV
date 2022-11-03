import { Component, OnInit} from '@angular/core';
import { Horarios } from 'src/app/Entidades/horarios';
import { Especialista, Paciente } from 'src/app/Entidades/usuario';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { HorariosServicesService } from 'src/app/Servicios/horarios-services.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {

  public paciente:any;
  public especialista:any;

  public especialistaMostrar:string;
  public pacienteMostar:string;

  public especialidad:string;

  public mostrarEspecialidades:boolean = false;
  public mostrarEspecialistas:boolean = false;
  public mostrarPacientes:boolean = false;

  public fechaSeleccionada:string = '';
  public horaSeleccionada:string = '';

  public dias = new Array<string>()
  public horarios = new Array<string>();

  constructor(public usuarioService:UsuarioService, 
    private usuariosService:UsuariosService,
    private horariosService:HorariosServicesService, 
    private turnosServices:TurnosService,
    private fireStorage:FirestorageService) { 
    this.pacienteMostar = '';
    this.especialidad = '';
    this.especialistaMostrar = '';
    
  }

  ngOnInit(): void {
    if(this.usuarioService.usuario['administrador'] != true)
    {
      this.paciente = this.usuarioService;
    }
  }

  public CargarDias(especialistaHorarios:Horarios)
  {
    let diasLaborales = new Array<boolean>(5)
    diasLaborales.fill(true);

    if(especialistaHorarios.lunes == ':-:') diasLaborales[0] = false;
    if(especialistaHorarios.martes == ':-:') diasLaborales[1] = false;
    if(especialistaHorarios.miercoles == ':-:') diasLaborales[2] = false;
    if(especialistaHorarios.jueves == ':-:') diasLaborales[3] = false;
    if(especialistaHorarios.viernes == ':-:') diasLaborales[4] = false;
    if(especialistaHorarios.sabado == ':-:') diasLaborales[5] = false;

    console.log(diasLaborales);
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
            console.log()
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
      this.dias.push(dia + '/' + mes);
      
      dia++;
      date.setDate(dia);
    }
  }

  public CargarEspecialidad(valor:string)
  {
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
      this.CargarDias(aux);
    }

    this.mostrarEspecialistas = false;
  }

  public CargarPaciente(valor:Paciente)
  {
    if(valor)
    {
      this.paciente = valor;
      this.pacienteMostar = this.paciente.nombre + ' ' + this.paciente.apellido;
    }

    this.mostrarPacientes = false;
  }


  public CargarHorarios(fecha:string)
  {
    this.fechaSeleccionada = fecha;
    this.horarios = [];
    let auxTurnos = this.turnosServices.FiltrarTurnosPorFecha(fecha, this.especialista.id);
    let intervalo = 15;
    let date = new Date();
    
    let fechaSplit = fecha.split('/');
    date.setDate(Number(fechaSplit[0]));
    date.setMonth(Number(fechaSplit[1]));
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

    for(let i = 0; horaAux != horaFinal; i++)
    {
      let hora = Number(horaAux.split(':')[0]);
      let minutos = Number(horaAux.split(':')[1]);

      minutos += intervalo;
      
      if(minutos >= 60)
      {
        minutos -= 60;
        hora++;
      }

      let auxHorario = hora.toString() + ':' + minutos.toString();
      if(this.turnosServices.HorarioDisponible(auxTurnos, auxHorario))
      {
        this.horarios.push(auxHorario);
      }
      horaAux = auxHorario;
    }
  }

  public SolicitarTurno()
  {
    console.log(this.fechaSeleccionada);
    this.fireStorage.AgregarTurno(this.especialista.id, this.paciente.usuario.id, this.especialidad, this.fechaSeleccionada, this.horaSeleccionada);
  }
}
