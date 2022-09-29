import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';

@Component({
  selector: 'app-velocidad',
  templateUrl: './velocidad.component.html',
  styleUrls: ['./velocidad.component.css']
})
export class VelocidadComponent implements OnInit {

  public display:Array<string>;
  public interval:any;
  public perdio:boolean;
  public tiempoMS:number;
  public puntos:number;

  constructor(private router:Router, public authService:AuthService) { 
    this.display = new Array<string>(16);
    this.display.fill('hidden',0,16);
    this.perdio = false;
    this.tiempoMS = 2000;
    this.puntos = 0;
  }

  ngOnInit(): void {
    this.interval = setInterval(()=>this.Juego(), this.tiempoMS);
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

  Juego()
  {
    this.display.map(val=>
      {
        if(val == 'visible')
        {
          this.perdio = true;
          console.log("perdiste");
          return;
        }
      })

    if(this.perdio)
    {
      clearInterval(this.interval);
    }
    else
    {
      let botonRandom = Math.floor(Math.random() * this.display.length);
      this.display[botonRandom] = 'visible';
      clearInterval(this.interval);
      this.interval = setInterval(()=>this.Juego(), this.tiempoMS);
    }
    
  }

  ClickBoton(idBoton:number)
  {
    this.puntos++;
    this.display[idBoton] = 'hidden';
    this.tiempoMS = this.tiempoMS - 50;
    timeInterval()
  }

  RecargarJuego()
  {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => { this.router.navigate(['juegos/velocidad']); }); 
  }

}
