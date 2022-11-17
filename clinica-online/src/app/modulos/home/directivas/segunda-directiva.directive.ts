import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appSegundaDirectiva]'
})
export class SegundaDirectivaDirective implements OnInit {

  @Input() color:string = 'red';
  constructor(private element:ElementRef) { 
  }

  ngOnInit(): void {
      this.element.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'orange';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = this.color;
  }

}
