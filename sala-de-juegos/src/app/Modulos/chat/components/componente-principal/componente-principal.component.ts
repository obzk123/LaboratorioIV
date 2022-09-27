import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mensaje } from 'src/app/Entidades/mensaje';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';
import { FirestorageService } from 'src/app/Servicios/FireStorage/firestorage.service';
import { query, where, getDocs, addDoc, collection, doc, setDoc, onSnapshot} from "firebase/firestore";

@Component({
  selector: 'app-componente-principal',
  templateUrl: './componente-principal.component.html',
  styleUrls: ['./componente-principal.component.css']
})
export class ComponentePrincipalComponent implements OnInit {

  public mensaje:string;
  public mensajes:Mensaje[];
  public usuario:string;

  constructor(private router:Router, public authService:AuthService, public firestore:FirestorageService) { 
    this.mensaje = '';
    this.mensajes = Array<Mensaje>();
    this.usuario = <string>this.authService.GetDataUser()?.email;
  }

  ngOnInit(): void {
    this.ObtenerMensajes();
  }

  async ObtenerMensajes()
  {
    this.mensajes.length = 0;

    let q = query(collection(this.firestore.db, "mensajes"));
    let querySnapshot = await getDocs(q);
      
    querySnapshot.forEach((db) =>  
    {
      let nuevoMensaje = new Mensaje();
      nuevoMensaje.nombre = db.data()['usuario'];
      nuevoMensaje.hora = db.data()['hora'];
      nuevoMensaje.mensaje = db.data()['mensaje'];
      this.mensajes.push(nuevoMensaje);
    });

    this.mensajes.sort(function(a,b)
    {
      console.log(a.hora);
      if(a.hora > b.hora)
      {
        return 1;
      }
      else
      {
        return -1;
      }
    });
  }


  delay(ms: number) 
  {
    return new Promise( resolve => setTimeout(resolve, ms) );
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

  EnviarMensaje()
  {
    if(this.mensaje)
    {
      this.firestore.GuardarMensaje(<string>this.authService.GetDataUser()?.email, this.mensaje);
      this.mensaje = '';
      this.ObtenerMensajes();
    }
    else
    {
      console.log("error");
    }
  }
}
