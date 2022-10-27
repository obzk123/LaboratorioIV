import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuario:any;
  public opcionHome:string = 'inicio';
  
  constructor(public auth:AuthService, public fireStorage:FirestorageService) { }

  ngOnInit(): void {
    this.ObtenerDatos();
  }

  async ObtenerDatos()
  {
    if(this.auth.GetEmail() != null)
    {
      await this.fireStorage.getProfile(this.auth.GetEmail()).then(m=>
        {
          this.usuario = m;
        });
    }
  }

  AsignarIndex(evento:string)
  {
    this.opcionHome = evento;

    console.log(this.opcionHome);
  }

}
