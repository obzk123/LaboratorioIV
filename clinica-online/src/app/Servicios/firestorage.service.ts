import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDocs, addDoc, collection, doc, updateDoc} from "firebase/firestore";
import { Especialista, Paciente } from '../Entidades/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {


  constructor(private db:Firestore, private auth:AuthService) { }

  async AgregarUsuarioEspecialista(especialista:Especialista)
  {
    const docRef = await addDoc(collection(this.db, "usuarios"),
    {
      nombre: especialista.nombre,
      apellido: especialista.apellido,
      edad: especialista.edad,
      dni: especialista.dni,
      email: especialista.email,
      password: especialista.password,
      img: especialista.img,
      especialidad: especialista.especialidad,
      validado: false
    });
  }

  async AgregarUsuarioPaciente(paciente:Paciente)
  {
    const docRef = await addDoc(collection(this.db, "usuarios"),
    {
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      edad: paciente.edad,
      dni: paciente.dni,
      email: paciente.email,
      password: paciente.password,
      img: paciente.img,
      obraSocial: paciente.obraSocial,
      img2: paciente.img2
    });
  }

  async AddLog(email:string)
  {
    const docRef = await addDoc(collection(this.db, "logUsuarios"),
    {
      email: email,
      fechaIngreso: new Date(),
    });
  }


  async getProfile(email:string)
  {
    let usuario = null;
    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    querySnapshot.forEach((doc) =>
    {
      let profile = doc.data();
      if(profile['email'] == email)
      {
        usuario = profile;
      }
    })
    return usuario;
  }

  async ModificarUsuario(usuario:any)
  {
    let email = this.auth.GetEmail();
    let docId = null;

    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    querySnapshot.forEach((doc) => 
    {
      let datos = doc.data();
      
      if(datos['email'] == email)
      {
        docId = <string>doc.id;
      }
    });

    if(docId != null)
    {
      const usuarioRef = doc(this.db, 'usuarios', docId);
      if(usuarioRef != null)
      {
        if(usuario['obraSocial'])
        {
          return updateDoc(usuarioRef, 
            { 
              nombre: usuario['nombre'],
              apellido: usuario['apellido'],
              edad: usuario['edad'],
              dni: usuario['dni'],
              email: usuario['email'],
              password: usuario['password'],
              img: usuario['img'],
              img2: usuario['img2'],
              obraSocial: usuario['obraSocial']
            });
        }
        else
        {
          return updateDoc(usuarioRef, 
            { 
              nombre: usuario['nombre'],
              apellido: usuario['apellido'],
              edad: usuario['edad'],
              dni: usuario['dni'],
              email: usuario['email'],
              password: usuario['password'],
              img: usuario['img'],
              especialidad: usuario['especialidad']
            });
        }
      }
    }
    

      
  }
}
