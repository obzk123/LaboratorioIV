import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FirestorageService } from 'src/app/Servicios/firestorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() public usuario:any;
  @Output() public index = new EventEmitter<string>();
  public administrador:boolean = false;

  constructor(public auth:AuthService, public route:Router, public fireStorage:FirestorageService) { }

  ngOnInit(): void {
    if(this.usuario['administrador'] == true)
    {
      this.administrador = true;
    }
  }

  CerrarSesion()
  {
    this.auth.SignOut();
    this.route.navigate(['login']);
  }

  Redirigir(evento:string)
  {
    this.index.emit(evento);
  }

}
