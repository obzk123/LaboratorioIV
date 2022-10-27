import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-validar-cuenta',
  templateUrl: './validar-cuenta.component.html',
  styleUrls: ['./validar-cuenta.component.css']
})
export class ValidarCuentaComponent implements OnInit {

  @Input() public usuario:any;
  constructor() { }

  ngOnInit(): void {
  }

}
