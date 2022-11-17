import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinica } from 'src/app/Entidades/historia-clinica';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { PdfService } from 'src/app/Servicios/pdf.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public formPerfil:FormGroup;
  public tipoDeUsuario:string;
  public especialidad:string;
  public especialidades = new Array<string>();
  public mostrarHorarios:boolean = false;
  public mostrarEspecialidades:boolean = false;
  public mostrarHistoriaClinica:boolean = false;

  constructor(private fireStorage:FirestorageService, public usuarioService:UsuarioService, private pdfservices:PdfService) { 
    
    this.especialidad = '';
    this.tipoDeUsuario = '';
    this.formPerfil = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      apellido: new FormControl('', [Validators.minLength(4), Validators.maxLength(20), Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.min(12), Validators.max(99)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      img: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit() : void 
  {
    this.SetearAgregarControles();
  }


  public DescargarPDF()
  {
    this.fireStorage.GetHistoriaClinica(this.usuarioService.usuario.id).then( (historia:HistoriaClinica | undefined) =>
      {
        if(historia != undefined)
        {
          this.pdfservices.CrearPDFHistoriaClinica(this.usuarioService.usuario, historia);
        }else
        {
          console.log("No tienes historia clinica");
        }
      })
    
  }

  Modificar()
  {
    if(this.formPerfil.valid)
    {
      this.fireStorage.ModificarUsuario(this.formPerfil.value).then(m =>
        {
          console.log("Modificado con exito");
          this.usuarioService.usuario = this.formPerfil.value;
        });
    }
    else
    {
      console.log("Datos invalidos");
    }
  }
  
  SetearAgregarControles()
  {
    this.formPerfil.controls['nombre'].setValue(this.usuarioService.usuario['nombre']);
    this.formPerfil.controls['apellido'].setValue(this.usuarioService.usuario['apellido']);
    this.formPerfil.controls['edad'].setValue(this.usuarioService.usuario['edad']);
    this.formPerfil.controls['dni'].setValue(this.usuarioService.usuario['dni']);
    this.formPerfil.controls['email'].setValue(this.usuarioService.usuario['email']);
    this.formPerfil.controls['password'].setValue(this.usuarioService.usuario['password']);

    if(this.usuarioService.usuario['especialidad'])
    {
      this.tipoDeUsuario = 'especialista';
      this.especialidades = this.usuarioService.usuario['especialidad'];
      this.formPerfil.addControl('especialidad', new FormControl(this.especialidades, Validators.required));
    }
    else if (this.usuarioService.usuario['obraSocial'])
    {
      this.tipoDeUsuario = 'paciente';
      this.formPerfil.addControl('obraSocial', new FormControl('', Validators.required));
      this.formPerfil.addControl('img2', new FormControl('', Validators.required));
      this.formPerfil.controls['obraSocial'].setValue(this.usuarioService.usuario['obraSocial']);
    }
  }

  EspecialidadUnica(valor:string)
  {
    for(let i = 0; i < this.especialidades.length; i++)
    {
      if(this.especialidades[i].toLowerCase() == valor.toLowerCase())
      {
        return false;
      }
    }
    return true;
  }

  AgregarEspecialidad(valor:string)
  {
    if(valor != '')
    {
      if(this.EspecialidadUnica(valor))
      {
        this.especialidades.push(valor);
      }else
      {
        console.log("Especialidad ya existente");
      }
      
    }else
    {
      console.log("No puede dejar vacio el campo especialidad al momento de agregar");
    }
    this.mostrarEspecialidades = false;
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

  SubirImagen($event:any, index:number)
  {
    if(index == 0)
    {
      this.formPerfil.controls['img'].setValue($event.target.files[0]);
    }else if(index == 1)
    {
      this.formPerfil.controls['img2'].setValue($event.target.files[0]);
    }
  }

}
