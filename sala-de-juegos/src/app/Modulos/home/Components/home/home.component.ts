import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entidades/usuario';
import { AuthService } from 'src/app/Servicios/AuthService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user:Usuario;

  constructor(private router:Router, private authService:AuthService) { 
    this.user = new Usuario();
  }

  ngOnInit(): void {
    this.user.email = <string>this.authService.GetDataUser()?.email;
  }

  SignOut()
  {
    this.authService.SignOut()
    .then((response)=> 
    {
      this.router.navigate(['/']);
    })
    .catch(error => console.log(error));
  }

}
