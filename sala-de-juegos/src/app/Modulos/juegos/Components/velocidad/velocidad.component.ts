import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';
import { FirestorageService } from 'src/app/Servicios/FireStorage/firestorage.service';

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
  private email:any;
  public highscore = '';

  constructor(private router:Router, public authService:AuthService, private firestorage:FirestorageService) { 
    this.display = new Array<string>(16);
    this.display.fill('hidden',0,16);
    this.perdio = false;
    this.tiempoMS = 2000;
    this.puntos = 0;
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario()
  {
    this.email = this.authService.GetDataUser()?.email;
    await this.firestorage.GetHighScore(<string>this.email, 'testvelocidad').then(numero=>
      {
        console.log(this.email);
        this.highscore = JSON.stringify(numero);
      });
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
      if(this.puntos > JSON.parse(this.highscore))
      {
        this.firestorage.ModificarHighScore(<string>this.email, this.puntos, 'testvelocidad');
      }
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
