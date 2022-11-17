import { Component, OnInit } from '@angular/core';
import { even } from '@rxweb/reactive-form-validators';
import { Chart, ChartDataset, ChartType } from 'chart.js';
import { LogUsuarios } from 'src/app/Entidades/log-usuarios';
import { Especialista } from 'src/app/Entidades/usuario';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';
import { ExcelService } from 'src/app/Servicios/excel.service';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { PdfService } from 'src/app/Servicios/pdf.service';
import { TurnosService } from 'src/app/Servicios/turnos.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})


export class EstadisticasComponent implements OnInit {

  public labelChart = new Array<string>();
  public lineChartData:ChartDataset[] = [];
  public lineChartType:ChartType = 'line';
  public chart:any;
  public logsDeUsuarios = Array<LogUsuarios>();
  public usuario:any;
  public logsDeUnUsuario = new Array<LogUsuarios>;
  public mostrarUsuario:boolean = false;

  public fechaInicial = new Date();
  public fechaMaxima = new Date();
  public opcion:number = -1;


  constructor(private excelService:ExcelService , private pdfservices:PdfService, private turnosServices:TurnosService, private especialidades:EspecialidadesService, private usuarios:UsuariosService, private firebase:FirestorageService) { 
  }

  ngOnInit(): void {
    this.CargarLogUsuarios();
  }

  public async CargarLogUsuarios()
  {
    await this.firebase.GetLogUsuarios().then(m=>
      {
        this.logsDeUsuarios = m;
      });
  }

  //● Log de ingresos al sistema. Indicando el usuario, día y horario que ingreso al sistema.
  public MostrarLogUsuarios(usuarioParam:any)
  {
    this.logsDeUnUsuario.length = 0;
    if(this.chart instanceof Chart)
    {
      this.chart.destroy();
    }

    this.opcion = -1;
    if(this.logsDeUsuarios != null && usuarioParam != undefined)
    {
      let usuario = this.usuarios.BuscarUsuarioPorID(usuarioParam.id);
      for(let i = 0; i < this.logsDeUsuarios.length; i++)
      {
        if(usuario.id == this.logsDeUsuarios[i].idUsuario)
        {
          this.usuario = usuario;
          this.logsDeUnUsuario.push(this.logsDeUsuarios[i]);
        }
      }
    }
    else
    {
      this.usuario = undefined;
      this.logsDeUnUsuario = [];
    }

    this.mostrarUsuario = false;
  }

  //● Cantidad de turnos por especialidad.
  public turnosPorEspecialidad()
  {
    this.opcion = -1;
    this.logsDeUnUsuario.length = 0;
    let map = new Map<string, number>();
    for(let i = 0; i < this.especialidades.especialidades.length; i++)
    {
      if(!map.has(this.especialidades.especialidades[i].nombre))
      {
        map.set(this.especialidades.especialidades[i].nombre, 0);
        for(let j = 0; j < this.turnosServices.turnos.length; j++)
        {
          if(this.turnosServices.turnos[j].especialidad == this.especialidades.especialidades[i].nombre)
          {
            let valor = <number> map.get(this.especialidades.especialidades[i].nombre);
            valor++;
            map.set(this.especialidades.especialidades[i].nombre, valor);
          }
        }
      }
    } 
    this.createChart(map, ['Especialidades'], 'bar');
  }

  public SetearOpcion(index:number)
  {
    this.logsDeUnUsuario.length = 0;
    if(this.chart instanceof Chart)
    {
      this.chart.destroy();
    }

    this.opcion = index;
  }
  
  public Confirmar()
  {
    if(this.opcion == 0)
    {
      this.cantidadTurnosSolicitados();
    }else if(this.opcion == 1)
    {
      this.cantidadTurnosFinalizados();
    }
  }

  //● Cantidad de turnos por día.
  public cantidadTurnosPorDia()
  {
    this.opcion = -1;
    this.logsDeUnUsuario.length = 0;
    let map = new Map<string, number>();
    for(let i = 0; i < this.turnosServices.turnos.length; i++)
    {
      if(!map.has(this.turnosServices.turnos[i].fecha))
      {
        map.set(this.turnosServices.turnos[i].fecha, 0);
        for(let j = 0; j < this.turnosServices.turnos.length; j++)
        {
          if(this.turnosServices.turnos[j].fecha == this.turnosServices.turnos[i].fecha)
          {
            let valor = <number> map.get(this.turnosServices.turnos[i].fecha);
            valor++;
            map.set(this.turnosServices.turnos[i].fecha, valor);
          }
        }
      }
    } 
    this.createChart(map, ['Dias'], 'bar');
  }

  //● Cantidad de turnos solicitado por médico en un lapso de tiempo.
  public cantidadTurnosSolicitados()
  {
    this.logsDeUnUsuario.length = 0;
    let map = new Map<string, number>();
    let especialistas = this.usuarios.FiltrarPorEspecialistas();
    for(let i = 0; i < especialistas.length; i++)
    {
      let especialistaNombre = especialistas[i].nombre + especialistas[i].apellido;
      if(!map.has(especialistaNombre))
      {
        map.set(especialistaNombre, 0);
      }

      for(let j = 0; j < this.turnosServices.turnos.length; j++)
      {
        if(this.ValidarFecha(this.turnosServices.turnos[j].fecha) && this.turnosServices.turnos[j].estadoTurno == 'esperando decision')
        {
          let segundoRecorrido = this.turnosServices.turnos[j].especialista.nombre + this.turnosServices.turnos[j].especialista.apellido;
          if(especialistaNombre == segundoRecorrido)
          {
            let valor = <number> map.get(especialistaNombre);
            valor++;
            map.set(especialistaNombre, valor);
          }
        }
      }
    }

    this.createChart(map, ['Fechas'], 'bar');
  }

  public MostrarUsuario()
  {
    this.mostrarUsuario = !this.mostrarUsuario;
  }

  private ValidarFecha(fecha:string):boolean
  {
    let fechaValor = fecha.split('/');
    let fechaInicial = this.fechaInicial.toString().split('-');
    let fechaMaxima = this.fechaMaxima.toString().split('-');
    let dateFechaInicial = new Date(Number.parseInt(fechaInicial[0]), Number.parseInt(fechaInicial[1]) - 1, Number.parseInt(fechaInicial[2]));
    let dateFechaMaxima = new Date(Number.parseInt(fechaMaxima[0]), Number.parseInt(fechaMaxima[1]) - 1, Number.parseInt(fechaMaxima[2]));
    let dateFechaValor = new Date(Number.parseInt(fechaValor[2]), Number.parseInt(fechaValor[1]) - 1, Number.parseInt(fechaValor[0]));

    console.log(dateFechaInicial);
    console.log(dateFechaMaxima);
    console.log(dateFechaValor);
    if(dateFechaInicial <= dateFechaValor && dateFechaValor <= dateFechaMaxima)
    {
      return true;
    }

    return false;
  }

  public ActualizarFecha(evento:any, valor:string)
  {
    if(valor == 'inicial')
    {
      this.fechaInicial = evento;
    }else
    {
      this.fechaMaxima = evento;
    }
  }
  //● Cantidad de turnos finalizados por médico en un lapso de tiempo.
  public cantidadTurnosFinalizados()
  {
    this.logsDeUnUsuario.length = 0;
    let map = new Map<string, number>();
    let especialistas = this.usuarios.FiltrarPorEspecialistas();
    for(let i = 0; i < especialistas.length; i++)
    {
      let especialistaNombre = especialistas[i].nombre + especialistas[i].apellido;
      if(!map.has(especialistaNombre))
      {
        map.set(especialistaNombre, 0);
      }

      for(let j = 0; j < this.turnosServices.turnos.length; j++)
      {
        if(this.ValidarFecha(this.turnosServices.turnos[j].fecha) && this.turnosServices.turnos[j].estadoTurno == 'realizado')
        {
          let segundoRecorrido = this.turnosServices.turnos[j].especialista.nombre + this.turnosServices.turnos[j].especialista.apellido;
          if(especialistaNombre == segundoRecorrido)
          {
            let valor = <number> map.get(especialistaNombre);
            valor++;
            map.set(especialistaNombre, valor);
          }
        }
      }
    }
    this.createChart(map, ['Fechas'], 'bar');
  }

  private createChart(datos:Map<string, number>, label:Array<string>, type:ChartType){
  
    if(this.chart instanceof Chart)
    {
      this.chart.destroy();
    }

    let clave =  Array.from(datos.keys());
    this.labelChart = label;
    this.lineChartData = [];
    this.lineChartType = type;

    for(let i = 0; i < datos.size; i++)
    {
        this.lineChartData.push({ data: [<number> datos.get(clave[i])], label: clave[i] });
    }
    this.chart = new Chart('chart', {
      type: this.lineChartType,
      data: 
      {
        labels: this.labelChart,
        datasets: this.lineChartData
      },
      options: {aspectRatio:2.5}
    });
  }

  public Descargar(opcion:string)
  {
    if(opcion == 'pdf')
    {
      this.pdfservices.CrearPDFLogUsuario(this.usuario, this.logsDeUnUsuario);
    }else
    {
      let arrayExcel = new Array<ExcelGrafico>();
      
      this.lineChartData.forEach(dato=>
        {
          let obj:ExcelGrafico = {label:<string>dato['label'], valor:<number>dato['data'][0]};
          arrayExcel.push(obj);
        })

      this.excelService.exportAsExcelFile(arrayExcel, 'grafico');
    }
  }
}

export interface ExcelGrafico {

  label: string;
  valor: number;
}