import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/Entidades/encuesta';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';
import { FirestorageService } from 'src/app/Servicios/FireStorage/firestorage.service';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public encuesta = new Encuesta();  
  public formEncuesta = new FormGroup({
    email: new FormControl(this.auth.GetDataUser()?.email),
    nombre: new FormControl(this.encuesta.nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    apellido: new FormControl(this.encuesta.apellido, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    edad: new FormControl(this.encuesta.edad, [Validators.required, Validators.min(18), Validators.max(99)]),
    telefono: new FormControl(this.encuesta.telefono, [Validators.required, Validators.min(100000), Validators.max(9999999999)]),
    respuesta: new FormControl(this.encuesta.respuesta, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    juegofavorito: new FormControl(this.encuesta.juegofavorito, [Validators.required]),
    condiciones: new FormControl(this.encuesta.condiciones, [Validators.requiredTrue]),
  });

  public error = false;

  constructor(private auth:AuthService, private firestorage:FirestorageService, private router:Router) { }

  ngOnInit(): void {}

  public Enviar(): void 
  {
    if(this.formEncuesta.valid == true)
    {
      this.firestorage.GuardarEncuesta(this.formEncuesta.value);
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => { this.router.navigate(['encuesta']); }); 
    }
    else
    {
      this.error = true;
    }
  }
}
