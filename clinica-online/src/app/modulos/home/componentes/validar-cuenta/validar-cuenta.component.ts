import { Component, OnInit, Input} from '@angular/core';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';
import { UsuariosService } from 'src/app/Servicios/usuarios.service';

@Component({
  selector: 'app-validar-cuenta',
  templateUrl: './validar-cuenta.component.html',
  styleUrls: ['./validar-cuenta.component.css']
})
export class ValidarCuentaComponent implements OnInit {

  constructor(public usuariosServices:UsuariosService, private fireStorage:FirestorageService) { }

  ngOnInit(): void {
  }

  async ActivarDesactivar(usuario:any, valor:boolean)
  {
    this.fireStorage.ActivarDesactivarUsuario(usuario.email, valor).then(m=>
      {
        usuario.validado = valor;
      });
    
  }

}
