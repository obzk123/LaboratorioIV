import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appPrimerDirectiva]'
})
export class PrimerDirectivaDirective implements OnInit{

  @Input() valor:string = '';
  private elemento:ElementRef|any;
  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
      this.elemento = this.elementRef.nativeElement;
      if(this.elemento != undefined)
      {
        this.elemento['value'] = this.valor;
      }

  }

}
