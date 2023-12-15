import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBg2Directive {

  @Input() isCorrect: Boolean = false;

  constructor(private el: ElementRef, private render: Renderer2) { }
  public aa=false;

  @HostListener('click') answer() {
    const allOptions = this.el.nativeElement.parentElement.getElementsByTagName('li');

    // Despinta todas las opciones
    Array.from(allOptions).forEach(option => {
      this.render.removeStyle(option, 'background');
      this.render.removeStyle(option, 'color');
      this.render.removeStyle(option, 'border');
    });

    // Pinta la opción actual si es correcta
    if(!this.aa){
      this.render.setStyle(this.el.nativeElement, 'background', '#05588d');
      this.render.setStyle(this.el.nativeElement, 'color', '#fff');
      this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
      this.aa=true;
    }
    else {
      this.render.setStyle(this.el.nativeElement, 'background', 'rgba(253,253,253,0)');
      this.render.setStyle(this.el.nativeElement, 'color', 'rgb(0,0,0)');
      this.render.setStyle(this.el.nativeElement, 'border', '');
      this.aa=false;
    }



  }
}
