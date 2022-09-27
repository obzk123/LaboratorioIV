import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { query, where, getDocs, addDoc, collection, doc, setDoc, onSnapshot} from "firebase/firestore";
import { Mensaje } from 'src/app/Entidades/mensaje';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  public mensajes:Mensaje[];

  constructor(public db:Firestore) { 
    this.mensajes = Array<Mensaje>();
  }

  async AddLog(user:string)
  {
    const docRef = await addDoc(collection(this.db, "logUsuarios"),
    {
      usuario: user,
      fechaIngreso: new Date()
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

}
