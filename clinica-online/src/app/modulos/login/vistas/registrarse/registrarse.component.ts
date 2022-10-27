import { Component, OnInit } from '@angular/core';
import { Especialista, Paciente } from 'src/app/Entidades/usuario';
import { FormControl, FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  public nombre:string = '';
  public apellido:string = '';
  public edad:number = 0;
  public dni:string = '';
  public correo:string = '';
  public password:string = '';
  public password2:string = '';
  public img:string = '';
  public tipoUsuario:string = '';
  public obraSocial:string = '';
  public img2:string = '';
  public especialidades = new Array<string>();
  public especialidad:string = '';

  public cargando:boolean = false;
  public formEncuesta:FormGroup;


  
  constructor(public authService:AuthService, public fireStorage:FirestorageService) { 
    this.formEncuesta = new FormGroup({
      nombre: new FormControl(this.nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      apellido: new FormControl(this.apellido, [Validators.minLength(4), Validators.maxLength(20), Validators.required]),
      edad: new FormControl(this.edad, [Validators.required, Validators.min(12), Validators.max(99)]),
      dni: new FormControl(this.dni, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      correo: new FormControl(this.correo, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      img: new FormControl(this.img, [Validators.required])
    });
  }

  ngOnInit(): void {}

  SetTipoUsuario(valor:string)
  {
    this.tipoUsuario = valor;
  }

  async Registrarme()
  {
    if(this.formEncuesta.valid == true)
    {
      this.cargando = true;
      if(this.tipoUsuario == 'especialista' && this.especialidades.length > 0)
      {
        let especialista = new Especialista(this.nombre, this.apellido, this.edad, this.dni, this.correo, this.password, this.img);
        this.especialidades.forEach(especialidad => {
          especialista.AddEspecialidad(especialidad);
        });

        this.authService.SignUp(especialista.email, especialista.password).then(ok =>
          {
            console.log("Se registro");
            this.fireStorage.AgregarUsuarioEspecialista(especialista).then(ok =>
              {
                console.log("Se agrego a la db");
                location.reload();
              }).catch(errorDb =>
                {
                  console.log(errorDb);
                  this.cargando = false;
                });
          }).catch(error =>
            {
              console.log(error);
              this.cargando = false;
            });

      }else if(this.tipoUsuario == 'paciente' && this.obraSocial != '' && this.img2 != '')
      {
        let paciente = new Paciente(this.nombre, this.apellido, this.edad, this.dni, this.correo, this.password, this.img, this.obraSocial, this.img2);
        await this.authService.SignUp(paciente.email, paciente.password).then(ok =>
          {
            console.log("Se registro");
            this.fireStorage.AgregarUsuarioPaciente(paciente).then(ok => 
              {
                console.log("Se agrego a la DB");
                location.reload();
              }).catch(errorDB => 
                {
                  console.log(errorDB);
                  this.cargando = false;
                });
          }).catch(error =>
            {
              console.log(error)
              this.cargando = false;
            });
      }else
      {
        console.log("Datos incorrectos");
        this.cargando = false;
      }
    } 
  }

  EspecialidadUnica()
  {
    for(let i = 0; i < this.especialidades.length; i++)
    {
      if(this.especialidades[i].toLowerCase() == this.especialidad.toLowerCase())
      {
        return false;
      }
    }
    return true;
  }

  AgregarEspecialidad()
  {
    if(this.especialidad != '')
    {
      if(this.EspecialidadUnica())
      {
        this.especialidades.push(this.especialidad);
        this.especialidad = '';
      }else
      {
        console.log("Especialidad ya existente");
      }
      
    }else
    {
      console.log("No puede dejar vacio el campo especialidad al momento de agregar");
    }
    
  }

  BorrarEspecialidad(valor:string)
  {
    for(let i = 0; i < this.especialidades.length; i++)
    {
      if(this.especialidades[i] == valor)
      {
        this.especialidades.splice(i, 1);
      }
    }
  }
}
