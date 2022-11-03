import { formatDate, registerLocaleData} from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDocs, addDoc, collection, doc, updateDoc} from "firebase/firestore";
import { Horarios } from '../Entidades/horarios';
import { Turnos } from '../Entidades/turnos';
import { Especialista, Paciente } from '../Entidades/usuario';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

registerLocaleData(localeEsAr, 'es-Ar');

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {


  constructor(private db:Firestore, private auth:AuthService, private storage:StorageService) { 
    
  }

  async ObtenerUltimoID() : Promise<number>
  {
    return (await this.getProfiles()).length;
  }

  async ObtenerUltimoIDTurnos() : Promise<number>
  {
    return (await this.getTurnos()).length;
  }


  async AgregarUsuarioEspecialista(especialista:Especialista)
  {
    let total = await this.ObtenerUltimoID();
    await this.storage.SubirImagen(especialista.img).then(img1 =>
      {
        this.storage.GetImagen('images/' + especialista.img['name']).then(getImg1 => 
          {
            especialista.img = getImg1
            addDoc(collection(this.db, "usuarios"),
            {
              id: total + 1,
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
          });
      });
  }

  async AgregarUsuarioPaciente(paciente:Paciente)
  {
    let total = await this.ObtenerUltimoID();
    await this.storage.SubirImagen(paciente.img).then(img1 =>
      {
        this.storage.GetImagen('images/' + paciente.img['name']).then(getImg1 => paciente.img = getImg1);

        this.storage.SubirImagen(paciente.img2).then(img2 =>
        {
          this.storage.GetImagen('images/' + paciente.img2['name']).then(getImg2 =>
            {
              paciente.img2 = getImg2
              addDoc(collection(this.db, "usuarios"),
              {
                id: total + 1,
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
            });
        });
    })
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

  async getProfileForID(id:number) : (Promise<Especialista | Paciente | any>)
  {
    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      let profile = querySnapshot.docs[i].data();
      if(profile['id'] == id && (profile['validado'] == true || profile['validado'] == false ) )
      {
        return <Especialista>profile;
      }else if(profile['id'] == id)
      {
        return <Paciente>profile;
      }
    }
  }

  async getProfiles()
  {
    let usuario = Array<any>();
    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    querySnapshot.forEach((doc) =>
    {
      usuario.push(doc.data());
    })
    
    return usuario;
  }

  async ActivarDesactivarUsuario(email:string, valor:boolean)
  {
    console.log(email);
    let docId = null;
    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    querySnapshot.forEach((doc) => 
    {
      let datos = doc.data();
      if(datos['email'] == email)
      {
        docId = <string>doc.id;
        console.log(datos);
      }
    });

    if(docId != null)
    {
      const usuarioRef = doc(this.db, 'usuarios', docId);
      if(usuarioRef != null)
      {
        await updateDoc(usuarioRef, 
          { 
            validado: valor
          });
      }
    }
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
          this.storage.SubirImagen(usuario.img).then(ok=>
          {
            this.storage.GetImagen('images/' + usuario.img['name']).then(img1Url=>
            {
              usuario.img = img1Url;
              this.storage.SubirImagen(usuario.img2).then(ok=>
              {
                this.storage.GetImagen('images/' + usuario.img2['name']).then(img2Url=>
                {
                  usuario.img2 = img2Url;
                  updateDoc(usuarioRef, 
                  { 
                    nombre: usuario['nombre'],
                    apellido: usuario['apellido'],
                    edad: usuario['edad'],
                    dni: usuario['dni'],
                    email: usuario['email'],
                    password: usuario['password'],
                    img: usuario.img,
                    img2: usuario.img,
                    obraSocial: usuario['obraSocial']
                  });
                });
              });
            });
          });
        }
        else
        {
          this.storage.SubirImagen(usuario.img).then(ok=>
          {
            this.storage.GetImagen('images/' + usuario.img['name']).then(img1Url=>
            {
              usuario.img = img1Url;
              updateDoc(usuarioRef, 
              { 
                nombre: usuario['nombre'],
                apellido: usuario['apellido'],
                edad: usuario['edad'],
                dni: usuario['dni'],
                email: usuario['email'],
                password: usuario['password'],
                img: usuario.img,
                especialidad: usuario['especialidad']
              });
            });
          });
        }
      }
    }
  }     
  
  async getTurnos() : Promise<Array<Turnos>>
  {
    let turnos = Array<Turnos>();
    const querySnapshot = await getDocs(collection(this.db, "turnos"));
    querySnapshot.forEach((doc) =>
    {
      let data = doc.data();
      
      this.getProfileForID(data['idEspecialista']).then((esp:(Especialista | Paciente | any))=>
        {
          let especialista = new Especialista(esp.nombre, esp.apellido, esp.edad, esp.dni, esp.email, esp.password, esp.img, esp['especialidad']);
          especialista.SetID(esp['id']);
          this.getProfileForID(data['idPaciente']).then( (pac:(Especialista | Paciente | any))=>
          {
            let paciente = new Paciente(pac.nombre, pac.apellido, pac.edad, pac.dni, pac.email, pac.password, pac.img, pac['obraSocial'], pac['img2']);
            paciente.SetID(pac['id']);
            let nuevoTurno = new Turnos(<Especialista>especialista, <Paciente>paciente, data['especialidad'], data['fecha'], data['hora'], data['estadoTurno'], data['comentario'], data['resenia']);
            nuevoTurno.id = data['id'];
            turnos.push(nuevoTurno);
          });
        });
    })
    return turnos;
  }
  
  async CambiarEstadoTurno(turno:Turnos, valor:string) : Promise<boolean>
  {
    const querySnapshot = await getDocs(collection(this.db, "turnos"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      if(querySnapshot.docs[i].data()['id'] == turno.id)
      {
        const turnoRef = doc(this.db, 'turnos', querySnapshot.docs[i].id);
        if(turnoRef != null)
        {
          updateDoc(turnoRef, 
            { 
              estadoTurno:valor
            });
          return true;
        }
      }
    }
    return false;
  }

  async ObtenerHorarioPorID(id:number) : Promise<Horarios | null>
  {
    const querySnapshot = await getDocs(collection(this.db, "horarios"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      let horarios = querySnapshot.docs[i].data();
      if(horarios['id'] == id)
      {
        return <Horarios>horarios;
      }
    }
    return null;
  }

  async ObtenerHorarios() : Promise<Array<Horarios> | null>
  {
    let horarios = new Array<Horarios>();
    const querySnapshot = await getDocs(collection(this.db, "horarios"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      horarios.push(<Horarios>querySnapshot.docs[i].data());
    }
    return horarios;
  }

  async GuardarHorarios(idEspecialista:number, horarios:Horarios) : Promise<boolean>
  {
    let docId = null;
    const querySnapshot = await getDocs(collection(this.db, "horarios"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      if(querySnapshot.docs[i].data()['id'] == idEspecialista)
      {
        docId = querySnapshot.docs[i].id;
        break;
      }
    }

    if(docId != null)
    {
      console.log(horarios);
      const horarioRef = doc(this.db, 'horarios', docId);
      updateDoc(horarioRef, 
      { 
        lunes: horarios.lunes,
        martes: horarios.martes,
        miercoles: horarios.miercoles,
        jueves: horarios.jueves,
        viernes: horarios.viernes,
        sabado: horarios.sabado,
      });
    return true;
  }
  else
  {
    this.CrearHorarios(idEspecialista, horarios);
    return true;
  }

  }

  async CrearHorarios(idEspecialista:number, horarios:Horarios)
  {
    return await addDoc(collection(this.db, "horarios"),
      {
        id: idEspecialista,
        lunes: horarios.lunes,
        martes: horarios.martes,
        miercoles: horarios.miercoles,
        jueves: horarios.jueves,
        viernes: horarios.viernes,
        sabado: horarios.sabado
      });
  }

  async GuardarComentario(turno:Turnos, comentario:string) : Promise<boolean | null>
  {
    let querySnapshot = await getDocs(collection(this.db, "turnos"));
    if(querySnapshot != null)
    {
      let id;
      for(let i = 0; i < querySnapshot.size; i++)
      {
        if(turno.id == querySnapshot.docs[i].data()['id'])
        {
          id = querySnapshot.docs[i].id;
          break;
        }
      }

      if(id != null)
      {
        let turnoRef = doc(this.db, 'turnos', id);
        updateDoc(turnoRef, {
          comentario: comentario
        });

        return true;
      }
      else
      {
        return false;
      }
    }

    return null;
  }

  async GuardarResenia(turno:Turnos, resenia:string) : Promise<boolean | null>
  {
    let querySnapshot = await getDocs(collection(this.db, "turnos"));
    if(querySnapshot != null)
    {
      let id;
      for(let i = 0; i < querySnapshot.size; i++)
      {
        if(turno.id == querySnapshot.docs[i].data()['id'])
        {
          id = querySnapshot.docs[i].id;
          break;
        }
      }

      if(id != null)
      {
        let turnoRef = doc(this.db, 'turnos', id);
        updateDoc(turnoRef, {
          resenia: resenia
        });

        return true;
      }
      else
      {
        return false;
      }
    }
    return null;
  }

  async AgregarTurno(idEspecialista:number, idPaciente:number, especialidad:string, fecha:string, hora:string)
  {

    let total = await this.ObtenerUltimoIDTurnos();
    await addDoc(collection(this.db, "turnos"),
    {
      id: total + 1,
      comentario: '',
      especialidad: especialidad,
      estadoTurno: 'esperando decision',
      fecha: fecha,
      hora: hora,
      idEspecialista: idEspecialista,
      idPaciente: idPaciente,
      resenia:''
    });


  }
}



