import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBigtitle]',
})
export class Bigtitle {
  constructor(
    private el: ElementRef,

    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
  }
}
