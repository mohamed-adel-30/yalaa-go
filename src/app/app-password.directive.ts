import { Directive, ElementRef } from '@angular/core';
@Directive({
  selector: '[appPassword]'
})
export class AppPasswordDirective {
  private _shown = false;
  constructor(private el: ElementRef) {
    this.setup();
  }
  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.classList.add('fa-eye-slash');
      span.classList.remove('fa-eye');
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.classList.add('fa-eye');
      span.classList.remove('fa-eye-slash');
    }
  }
  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.classList.add('far');
    span.classList.add('fa-eye');
    span.style.color = "orange";
    span.style.position = "relative";
    span.style.marginLeft = "auto";
    span.style.bottom = "16px";
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}