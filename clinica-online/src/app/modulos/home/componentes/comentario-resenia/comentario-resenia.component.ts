import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Turnos } from 'src/app/Entidades/turnos';
import { Especialista, Paciente } from 'src/app/Entidades/usuario';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';

@Component({
  selector: 'app-comentario-resenia',
  templateUrl: './comentario-resenia.component.html',
  styleUrls: ['./comentario-resenia.component.css']
})
export class ComentarioReseniaComponent implements OnInit {

  @Input() turno:any;
  @Input() opcion:string;
  @Output() eventoSalir = new EventEmitter<boolean>();
  public comentarioresenia:string;

  constructor(private fireStorage:FirestorageService) {
    this.opcion = '';
    this.comentarioresenia = '';
   }

  ngOnInit(): void {
    if(this.opcion == 'verComentario')
    {
      this.comentarioresenia = "Comentario: " + this.turno.comentario;
    }else if(this.opcion == 'verResenia')
    {
      this.comentarioresenia = "Reseña: " + this.turno.resenia;
    }else if(this.opcion == 'verReseniaComentario')
    {
      if(this.turno.comentario != '')
      {
        this.comentarioresenia = "Comentario: " + this.turno.comentario + '\n';
      }
      else
      {
        this.comentarioresenia = "No tiene comentario\n";
      }
      
      if(this.turno.resenia != '')
      {
        this.comentarioresenia += "Reseña: " + this.turno.resenia + '\n';
      }
      else
      {
        this.comentarioresenia += "No tiene reseña\n";
      }
    }
  }

  public Confirmar()
  {
    if(this.comentarioresenia != '' && this.comentarioresenia.length > 10)
    {
      let promise;
      if(this.opcion == 'comentario')
      {
        promise = this.fireStorage.GuardarComentario(this.turno, this.comentarioresenia);
      }
      else
      {
        promise = this.fireStorage.GuardarResenia(this.turno, this.comentarioresenia);
      }
      
      promise.then(ok=>{
        if(ok)
        {
          this.Salir(true);
        }
      });
    }
    else
    {
      console.log("Faltan datos")
    }
  }

  public Salir(valor:boolean)
  {
    this.eventoSalir.emit(valor);
  }
}
