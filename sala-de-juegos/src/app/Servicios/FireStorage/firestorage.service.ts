import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public db:Firestore) { }

  async AddLog(user:string)
  {
    const docRef = await addDoc(collection(this.db, "logUsuarios"),
    {
      usuario: user,
      fechaIngreso: new Date()
    });
  }
}
