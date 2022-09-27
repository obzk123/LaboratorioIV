import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carta } from 'src/app/Entidades/carta';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  public cartas:Carta[];
  public cartaActual:Carta;
  public cartaProxima:Carta;
  private cartaAux:Carta;
  public puntos:number;
  public imgCarta:string;

  public eleccion:boolean = false;
  public perdio:boolean = false;

  public randomActual:number;
  public randomProximo:number;
  

  constructor(private router:Router, private auth:AuthService) { 
    this.puntos = 0;
    this.randomActual = 0;
    this.randomProximo = 0;
    this.cartaAux = new Carta();
    this.cartas = new Array<Carta>();
    this.cartaActual = new Carta();
    this.cartaProxima = new Carta();
    this.imgCarta = '';
  }

  ngOnInit(): void {

    let cartaAux1 = {numeroDeCarta:1, imagen:"carta1"};
    let cartaAux2 = {numeroDeCarta:2, imagen:"carta2"};
    let cartaAux3 = {numeroDeCarta:3, imagen:"carta3"};
    let cartaAux4 = {numeroDeCarta:4, imagen:"carta4"};
    let cartaAux5 = {numeroDeCarta:5, imagen:"carta5"};
    let cartaAux6 = {numeroDeCarta:6, imagen:"carta6"};

    this.cartas.push(cartaAux1);
    this.cartas.push(cartaAux2);
    this.cartas.push(cartaAux3);
    this.cartas.push(cartaAux4);
    this.cartas.push(cartaAux5);
    this.cartas.push(cartaAux6);

    this.randomActual = Math.floor(Math.random() * this.cartas.length);
    this.randomProximo = Math.floor(Math.random() * this.cartas.length);

    this.cartaActual = this.cartas[ this.randomActual];
    while(this.randomActual ==  this.randomProximo)
    {
      this.randomProximo = Math.floor(Math.random() * this.cartas.length);
    }
    this.cartaProxima = this.cartas[this.randomProximo];

    console.log("Numero de carta actual: " + this.cartaActual.numeroDeCarta);
    console.log("Numero de carta proxima: " + this.cartaProxima.numeroDeCarta);
   
    this.CartaImagen();

  }

  CambiarCartaActual()
  {
    this.cartaActual = this.cartaProxima;
    this.randomActual = this.randomProximo;

    this.randomProximo = Math.floor(Math.random() * this.cartas.length);
    while(this.randomActual ==  this.randomProximo)
    {
      this.randomProximo = Math.floor(Math.random() * this.cartas.length);
    }

    this.cartaProxima = this.cartas[this.randomProximo];
    this.CartaImagen();
  }

  Resultado()
  {
    if( ( (this.cartaActual.numeroDeCarta < this.cartaProxima.numeroDeCarta) && this.eleccion) || ( (this.cartaActual.numeroDeCarta > this.cartaProxima.numeroDeCarta) && !this.eleccion))
    {
      this.puntos++;
      console.log("Ganaste");
      this.CambiarCartaActual();
    }
    else
    {
      console.log("Perdiste");
      this.perdio = true;
    }

    console.log("Random Actual: " + this.randomActual);
    console.log("Random Proximo: " +  this.randomProximo);

    console.log("Numero de carta actual: " + this.cartaActual.numeroDeCarta);
    console.log("Numero de carta proxima: " + this.cartaProxima.numeroDeCarta);
  }

  CambiarValor(valor:boolean)
  {
    this.eleccion = valor;
    if(valor)
    {
      console.log("Opcion Mayor");
    }
    else
    {
      console.log("Opcion Menor");
    }

    this.Resultado();
  }

  RecargarJuego()
  {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => { this.router.navigate(['juegos/mayor-menor']); }); 
  }

  SignOut()
  {
    this.auth.SignOut();
    this.router.navigate(['/login']);
  }

  CartaImagen()
  {
    switch(this.cartaActual.numeroDeCarta)
    {
      case 1:
        this.imgCarta = 'assets/img/cartaUno.jpg';
        break;
      case 2:
        this.imgCarta = 'assets/img/cartaDos.jpg';
        break;
      case 3:
        this.imgCarta = 'assets/img/cartaTres.jpg';
        break;
      case 4:
        this.imgCarta = 'assets/img/cartaCuatro.jpg';
        break;
      case 5:
        this.imgCarta = 'assets/img/cartaCinco.jpg';
      break;
      case 6:
        this.imgCarta = 'assets/img/cartaSeis.jpg';
      break;
    }
  }
}
