import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  public estaJugando:boolean;
  public desactivarBoton:boolean;
  public segundosAnimacion:number;
  public categorias:Array<string>;
  public puntos:number;
  public categoria:string;

  constructor(private router:Router, public authService:AuthService) { 
    this.puntos = 0;
    this.categoria = '';
    this.estaJugando = false;
    this.desactivarBoton = false;
    this.segundosAnimacion = 0.5;
    this.categorias = ['deportes', 'arte', 'cine', 'corona', 'geografia', 'ciencia', 'historia'];
  }

  ngOnInit(): void {
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

  GirarRuleta()
  { 
    this.segundosAnimacion = 0;
    let numeroRandom = Math.floor(Math.random() * this.categorias.length);
    this.categoria = this.categorias[numeroRandom];
    this.estaJugando = true;
  }


  OutputJugo(valorDeEntrada:boolean)
  {
    this.estaJugando = valorDeEntrada;
  }

}
