import { registerLocaleData} from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDocs, addDoc, collection, doc, updateDoc} from "firebase/firestore";
import { Especialidades } from '../Entidades/especialidades';
import { HistoriaClinica } from '../Entidades/historia-clinica';
import { Horarios } from '../Entidades/horarios';
import { LogUsuarios } from '../Entidades/log-usuarios';
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

  public async ObtenerUltimoIDTurnos()
  {
    let auxId = 0;
    /*for(let i = 0; this.turnosService.turnos.length; i++)
    {
      if(i == 0 || this.turnosService.turnos[i].id > auxId)
      {
        auxId = this.turnosService.turnos[i].id;
      }
    }*/
    return auxId;
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

  async getProfileForID(id:number) : (Promise<Especialista | Paciente | undefined>)
  {
    const querySnapshot = await getDocs(collection(this.db, "usuarios"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      let profile = querySnapshot.docs[i].data();
      if(profile['id'] == id && (profile['validado'] == true || profile['validado'] == false ) )
      {
        return <Especialista>profile;
      }
      else if(profile['id'] == id)
      {
        return <Paciente>profile;
      }
    }
    return undefined;
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
  
  async getTurnos() : Promise<Array<Turnos> | undefined>
  {
    let turnos = Array<Turnos>();
    const querySnapshot = await getDocs(collection(this.db, "turnos"));
  
    for(let i = 0; i < querySnapshot.size; i++)
    {
      let datos = querySnapshot.docs[i].data();
      
      let especialista = await this.getProfileForID(datos['idEspecialista']);
      if(especialista == undefined || especialista instanceof Paciente)
      {
        console.log("Se fue por el undefined del especialista");
        return undefined;
      }

      let paciente = await this.getProfileForID(datos['idPaciente']);
      if(paciente == undefined || paciente instanceof Especialista)
      {
        console.log("Se fue por el undefined del paciente");
        return undefined;
      }

      let nuevoTurno = new Turnos(especialista, paciente, datos['especialidad'], datos['fecha'], datos['hora'], datos['estadoTurno'], datos['comentario'], datos['resenia']);
      nuevoTurno.id = datos['id'];
      turnos.push(nuevoTurno);
    }
    
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

    console.log(horarios.lunes);
    console.log(horarios.martes);
    console.log(horarios.miercoles);
    console.log(horarios.jueves);
    if(docId != null)
    {
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

  async CrearLog(idUsuario:number)
  {
    let fecha = new Date();

    return await addDoc(collection(this.db, "logUsuarios"),
      {
        id: idUsuario,
        fecha: fecha.getDate().toString() + '/' + (fecha.getMonth() + 1).toString() + '/' + fecha.getFullYear(),
        hora: fecha.getHours().toString() + ':' + fecha.getMinutes().toString(),
      });
  }

  async GetLogUsuarios() : Promise<Array<LogUsuarios>>
  {
    let logUsuarios = Array<LogUsuarios>();
    const querySnapshot = await getDocs(collection(this.db, "logUsuarios"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      let datos = querySnapshot.docs[i].data();
      let nuevoLog = new LogUsuarios(datos['id'], datos['fecha'], datos['hora']);
      logUsuarios.push(nuevoLog);
    }
    return logUsuarios;
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

  async AgregarTurno(id:number, especialista:Especialista, paciente:Paciente, especialidad:string, fecha:string, hora:string) : Promise<Turnos | undefined>
  {

    console.log(id);
    let turno = undefined;
    let date = new Date();
    await addDoc(collection(this.db, "turnos"),
    {
      id: id,
      comentario: '',
      especialidad: especialidad,
      estadoTurno: 'esperando decision',
      fecha: fecha + '/' + date.getFullYear().toString(),
      hora: hora,
      idEspecialista: especialista.id,
      idPaciente: paciente.id,
      resenia:''
    }).then(ok=>
      {
        turno = new Turnos(especialista, paciente, especialidad, fecha, hora, 'esperando decision', '', '');
        turno.id = id;
      });

    return turno;
  }

  async GetEspecialidades() : Promise<Array<Especialidades> | undefined>
  {
    let especialidades = Array<Especialidades>();
    const querySnapshot = await getDocs(collection(this.db, "especialidades"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      let datos = querySnapshot.docs[i].data();
      let nuevaEspecialidad = new Especialidades(datos['id'], datos['nombre'], datos['imagen']);
      especialidades.push(nuevaEspecialidad);
    }
    return especialidades;
  }

  async GetHistoriaClinica(idPaciente:number) : Promise<HistoriaClinica | undefined>
  {
    let historia = undefined;
    const querySnapshot = await getDocs(collection(this.db, "historiasclinicas"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      let datos = querySnapshot.docs[i].data();
      if(datos['idPaciente'] == idPaciente)
      {
        historia = new HistoriaClinica(datos['idPaciente'], datos['altura'], datos['peso'], datos['temperatura'], datos['presion'], datos['datosExtras']);
        break;
      }
    }
    return historia;
  }

  async AgregarHistoriaClinica(historiaClinica:HistoriaClinica) : Promise<boolean>
  {
    await addDoc(collection(this.db, "historiasclinicas"),
    {
      idPaciente: historiaClinica.idPaciente,
      altura: historiaClinica.altura,
      peso: historiaClinica.peso,
      temperatura: historiaClinica.temperatura,
      presion: historiaClinica.presion,
      datosExtras: historiaClinica.datosExtras,
    });
    return true;
  }

  async ActualizarHistoriaClinica(historiaClinica:HistoriaClinica) : Promise<boolean>
  {
    let docId = undefined;
    let querySnapshot = await getDocs(collection(this.db, "historiasclinicas"));
    for(let i = 0; i < querySnapshot.size; i++)
    {
      let datos = querySnapshot.docs[i].data();
      if(datos['idPaciente'] == historiaClinica.idPaciente)
      {
        docId = <string>querySnapshot.docs[i].id;
        break;
      }
    }

    if(docId != undefined)
    {
      let usuarioRef = doc(this.db, 'historiasclinicas', docId);
      if(usuarioRef != null)
      {
        updateDoc(usuarioRef, 
          { 
            idPaciente: historiaClinica.idPaciente,
            altura: historiaClinica.altura,
            peso: historiaClinica.peso,
            temperatura: historiaClinica.temperatura,
            presion: historiaClinica.presion,
            datosExtras: historiaClinica.datosExtras,
          });

          return true;
      }
    }
    return false;
  }
}



