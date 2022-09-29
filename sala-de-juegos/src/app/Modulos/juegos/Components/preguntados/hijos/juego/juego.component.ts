import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/Entidades/pregunta';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';
import { HttpsService } from 'src/app/Servicios/https.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  public preguntas:Pregunta[];
  public pregunta:Pregunta;
  
  @Input() public categoria:string;
  @Output() public eventoCambioJugo = new EventEmitter<boolean>();
  @Output() public eventoSumarPunto = new EventEmitter<boolean>();

  constructor(private router:Router, public authService:AuthService, private https:HttpsService) { 
    this.preguntas = Array<Pregunta>();
    this.pregunta = new Pregunta();
    this.categoria = '';
    this.preguntas.push(Pregunta.CargarPregunta('imagen', 'deportes', '¿Cual es el jugador que tiene mas balones de oro?', 'Cristiano Ronaldo', 'Neymar Junior', 'Kylian Mbappe', 'Lionel Messi', 4));
    this.preguntas.push(Pregunta.CargarPregunta('imagen', 'arte', 'Arte', 'r1', 'r2', 'r3(Correcta)', 'r4', 3));
    this.preguntas.push(Pregunta.CargarPregunta('imagen', 'cine', 'Cine', 'r1', 'r2(Correcta)', 'r3', 'r4', 2));
    this.preguntas.push(Pregunta.CargarPregunta('imagen', 'geografia', 'Geografia', 'r1(Correcta)', 'r2', 'r3', 'r4', 1));
    this.preguntas.push(Pregunta.CargarPregunta('imagen', 'ciencia', 'Ciencia', 'r1(Correcta)', 'r2', 'r3', 'r4', 1));
    this.preguntas.push(Pregunta.CargarPregunta('imagen', 'historia', 'Historia', 'r1(Correcta)', 'r2', 'r3', 'r4', 1));
  }

  ngOnInit() 
  {
    this.ElegirPregunta();
    this.CargarImagen();
  }

  CargarImagen()
  {
    let buscar = '';
    switch(this.pregunta.categoria)
    {
      case 'ciencia':
        buscar = 'science';
      break;
      case 'deportes':
        buscar = 'sports';
      break;
      case 'geografia':
        buscar = 'geography';
      break;
      case 'arte':
        buscar = 'art';
      break;
      case 'cine':
        buscar = 'movies';
      break;
      case 'historia':
        buscar = 'history';
      break;
    }

    let randomImagen = Math.floor(Math.random() * 10);
    this.https.getImage('https://api.pexels.com/v1/search?query=' + buscar).subscribe((response:any)=>{
      let urlFoto = response;
      this.pregunta.imagen = urlFoto['photos'][randomImagen]['src']['original'];
    });
  }


  SignOut()
  {
    this.authService.SignOut()
    .then((response)=> 
    {
      this.router.navigate(['/']);
    })
    .catch(error => console.log(error));
  }

  ElegirPregunta()
  {
    let numeroRandom = 0;
    console.log(this.categoria);
    if(this.categoria != 'corona')
    {
      let arrayPorSeccion = new Array<Pregunta>();
      this.preguntas.forEach(p => {
        if(p.categoria == this.categoria)
        {
          arrayPorSeccion.push(p);
        }
      });
      
      numeroRandom = Math.floor(Math.random() * arrayPorSeccion.length);
      this.pregunta = arrayPorSeccion[numeroRandom];
    }
    else
    {
      numeroRandom = Math.floor(Math.random() * this.preguntas.length);
      this.pregunta = this.preguntas[numeroRandom];
    }
    
  }

  ValidarCorrecta(idBoton:number)
  {
    if(idBoton == this.pregunta.correcta)
    {
      this.eventoSumarPunto.emit(true);
    }
    this.eventoCambioJugo.emit();
  }
}
