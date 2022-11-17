import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import { HistoriaClinica } from '../Entidades/historia-clinica';
import { Paciente } from '../Entidades/usuario';
import {formatDate} from '@angular/common';
import { LogUsuarios } from '../Entidades/log-usuarios';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  public doc = new jsPDF();
  constructor() { }

  public CrearPDFHistoriaClinica(paciente:Paciente, historiaClinica:HistoriaClinica)
  {
    let fecha = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.doc.addImage("assets/images/icono.png", 'png', 130, 10, 64, 64);
    this.doc.text("Historia clinica de " + paciente.nombre + ' ' + paciente.apellido, 10, 30);

    this.doc.text("Altura: " + historiaClinica.altura, 10, 60);
    this.doc.text("temperatura: " + historiaClinica.temperatura, 10, 90);
    this.doc.text("Presion: " + historiaClinica.presion, 10, 120);
    this.doc.text("Datos Extras: " + historiaClinica.datosExtras, 10, 150);

    this.doc.text("fecha de emision:  " + fecha, 10, 200);
    this.doc.save("historia" + paciente.nombre + paciente.apellido + ".pdf");
  }

  public CrearPDFLogUsuario(usuario:any, logs:Array<LogUsuarios>)
  {
    let fecha = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.doc.addImage("assets/images/icono.png", 'png', 130, 10, 64, 64);
    this.doc.text("Log de " + usuario.nombre + ' ' + usuario.apellido, 10, 30);

    this.doc.text("Fecha Horario", 10, 60);
    for(let i = 0; i < logs.length; i++)
    {
      this.doc.text(logs[i].fecha, 10, ((90)*i + 90));
      this.doc.text(logs[i].hora, 50, ((90)*i + 90));
    }

    this.doc.text("fecha de emision:  " + fecha, 10, 300);
    this.doc.save("logs" + usuario.nombre + usuario.apellido + ".pdf");
  }
}



