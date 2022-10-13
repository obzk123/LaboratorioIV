import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { query, where, getDocs, addDoc, collection, doc, setDoc, onSnapshot, updateDoc, DocumentData} from "firebase/firestore";
import { Mensaje } from 'src/app/Entidades/mensaje';
import { AuthService } from '../AuthService/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  public mensajes:Mensaje[];
  private docId:string;


  constructor(public db:Firestore, public auth:AuthService) { 
    this.docId = '';
    this.mensajes = Array<Mensaje>();
  }

  async AgregarUsuario(user:string, tipoperfil:string)
  {
    const docRef = await addDoc(collection(this.db, "usuarios"),
    {
      usuario: user,
      perfil: tipoperfil,
      puntajePreguntados:0,
      puntajeMayorMenor:0,
      puntajeAhorcado:0,
      puntajeTestVelocidad:0
    });
  }

  async AddLog(user:string)
  {
    const docRef = await addDoc(collection(this.db, "logUsuarios"),
    {
      usuario: user,
      fechaIngreso: new Date(),
      puntajePreguntados:0,
      puntajeMayorMenor:0,
      puntajeAhorcado:0,
      puntajeTestVelocidad:0
    });
  }

  async GuardarMensaje(email:string, msj:string)
  {
    var time = new Date();
    const docRef = await addDoc(collection(this.db, "mensajes"),
    {
      usuario:email,
      mensaje: msj,
      hora: time.toLocaleString('es-AR', {day: 'numeric', month:'2-digit', year:'2-digit', hour:'numeric', hour12: false, minute:'numeric', second:'numeric'})
    });
  }

  async GuardarEncuesta(datos:any)
  {
    const docRef = await addDoc(collection(this.db, "encuesta"),
    {
      email: datos['email'],
      nombre: datos['nombre'],
      apellido: datos['apellido'],
      edad: datos['edad'],
      telefono: datos['telefono'],
      juegofavorito: datos['juegofavorito'],
      respuesta: datos['respuesta']
    });
  }

  async getProfile(email:string)
  {
    let tipoUsuario = 'usuario';
    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    querySnapshot.forEach((doc) =>
    {
      let profile = doc.data();
      if(profile['usuario'] == email)
      {
        tipoUsuario = profile['perfil'];
      }
    })
    return tipoUsuario;
  }

  async GetHighScore(email:string, juego:string)
  {
    let highscore;
    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    querySnapshot.forEach((doc) => 
    {
      let datos = doc.data();
      if(datos['usuario'] == email)
      {
        switch(juego)
        {
          case 'ahorcado':
            highscore = <number>datos['puntajeAhorcado'];
          break;
          case 'mayormenor':
            highscore = <number>datos['puntajeMayorMenor'];
          break;
          case 'preguntados':
            highscore = <number>datos['puntajePreguntados'];
          break;
          case 'testvelocidad':
            highscore = <number>datos['puntajeTestVelocidad'];
          break;
        }
      }
    });
    return highscore;
  }

  async ModificarHighScore(email:string, nuevoHighScore:number, juego:string)
  {
    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    querySnapshot.forEach((doc) => 
    {
      let datos = doc.data();
      if(datos['usuario'] == email)
      {
        this.docId = <string>doc.id;
      }
    });

    const usuarioRef = doc(this.db, 'usuarios', this.docId);
    switch(juego)
    {
      case 'ahorcado':
      updateDoc(usuarioRef, 
        { 
          puntajeAhorcado: nuevoHighScore,
        });
      break;

      case 'mayormenor':
      updateDoc(usuarioRef, 
        { 
          puntajeMayorMenor: nuevoHighScore,
        });
      break;

      case 'preguntados':
      updateDoc(usuarioRef, 
        { 
          puntajePreguntados: nuevoHighScore,
        });
      break;

      case 'testvelocidad':
      updateDoc(usuarioRef, 
        { 
          puntajeTestVelocidad: nuevoHighScore,
        });
      break;
    }
  }

}
