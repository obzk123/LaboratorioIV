import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  public letras:string[];
  public diccionario:string[];
  public palabraOculta:string;
  public numeroRandom:number;
  public palabra:string[];
  public clicked:boolean[];
  public img:string;

  public ventanaEmergente:boolean;
  public gano:boolean;
  public perdio:boolean;
  public intentos:number;

  constructor(private router:Router, private auth:AuthService) { 
    this.letras = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    this.diccionario = ['manzana', 'banana', 'pera', 'frutilla', 'naranja', 'limon', 'papa', 'cereza'];
    this.palabraOculta = '';
    this.numeroRandom = 0;
    this.palabra = [];
    this.intentos = 0;
    this.img = 'assets/img/ahorcadoLimpio.png';

    this.ventanaEmergente = false;
    this.gano = false;
    this.perdio = false;
    this.clicked = [false];
  }

  ngOnInit(): void 
  {
    this.numeroRandom = Math.floor(Math.random() * this.diccionario.length);
    this.palabraOculta = this.diccionario[this.numeroRandom];
   
    for(let  i = 0; i < this.palabraOculta.length; i++)
    {
      this.palabra[i] = '_';
    }

    console.log(this.palabraOculta);
  }

  Verificar(letra:string)
  {
    letra = letra.toLowerCase();
    let intentoValido = false;
    for(let i = 0; i < this.palabraOculta.length; i++)
    {
      if(this.palabraOculta[i] == letra)
      {
        this.palabra[i] = letra;
        intentoValido = true;
      }
    }

    if(!intentoValido)
    {
      this.intentos++;
      switch(this.intentos)
      {
        case 1:
          this.img = 'assets/img/ahorcadoCabeza.png';
          break;
        case 2:
          this.img = 'assets/img/ahorcadoTercerIntento.png';
          break;
        case 3:
          this.img = 'assets/img/ahorcadoCuartoIntento.png';
          break;
        case 4:
          this.img = 'assets/img/ahorcadoQuintoIntento.png';
          break;
        case 5:
          this.img = 'assets/img/ahorcadoSextoIntento.png';
          break;
        case 6:
          this.img = 'assets/img/ahorcadoSeptimoIntento.png';
          break;
      }
    }

    this.Victoria();
    console.log(this.palabra);
  }

  Victoria()
  {
    let palabraAux = '';
    
    for(let i = 0; i< this.palabra.length; i++)
    {
      palabraAux += this.palabra[i];
    }

    if(palabraAux == this.palabraOculta)
    {
      this.gano = true;
      this.ventanaEmergente = true;
    }
    else if(this.intentos == 6)
    {
      this.perdio = true;
      this.ventanaEmergente = true;
    }
  }

  RecargarJuego()
  {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => { this.router.navigate(['juegos/ahorcado']); }); 
  }

  SignOut()
  {
    this.auth.SignOut();
    this.router.navigate(['/login']);
  }

}
