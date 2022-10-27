import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() public usuario:any;

  public formPerfil:FormGroup;
  public tipoDeUsuario:string;
  public especialidad:string;
  public especialidades = new Array<string>();

  constructor(public fireStorage:FirestorageService, private route:Router) { 
    
    this.especialidad = '';
    this.tipoDeUsuario = '';
    this.formPerfil = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      apellido: new FormControl('', [Validators.minLength(4), Validators.maxLength(20), Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.min(12), Validators.max(99)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      img: new FormControl('', [Validators.required])
    });

  }

  ngOnInit() : void 
  {
    this.SetearAgregarControles();
  }


  Modificar()
  {
    if(this.formPerfil.valid)
    {
      this.usuario = this.formPerfil.value;
      this.fireStorage.ModificarUsuario(this.usuario).then(m =>
        {
          console.log("Modificado con exito");
        });
    }
    else
    {
      console.log("Datos invalidos");
    }
  }
  
  SetearAgregarControles()
  {
    this.formPerfil.controls['nombre'].setValue(this.usuario['nombre']);
    this.formPerfil.controls['apellido'].setValue(this.usuario['apellido']);
    this.formPerfil.controls['edad'].setValue(this.usuario['edad']);
    this.formPerfil.controls['dni'].setValue(this.usuario['dni']);
    this.formPerfil.controls['email'].setValue(this.usuario['email']);
    this.formPerfil.controls['password'].setValue(this.usuario['password']);
    this.formPerfil.controls['img'].setValue(this.usuario['img']);

    if(this.usuario['especialidad'])
    {
      this.tipoDeUsuario = 'especialista';
      this.especialidades = this.usuario['especialidad'];
    }
    else if (this.usuario['obraSocial'])
    {
      this.tipoDeUsuario = 'paciente';
      this.formPerfil.addControl('obraSocial', new FormControl('', Validators.required));
      this.formPerfil.addControl('img2', new FormControl('', Validators.required));
      this.formPerfil.controls['obraSocial'].setValue(this.usuario['obraSocial']);
      this.formPerfil.controls['img2'].setValue(this.usuario['img2']);

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
