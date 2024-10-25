import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimations]',
  standalone: true,
})
export class ScrollAnimationsDirective implements AfterViewInit {
  @Input('animationInput') animationInput: string = "";
  @Input('animationOutput') animationOutput: string = "fadeOut";
  @Input('opacityEnd') opacityEnd: string = "1";
  @Input('animationDelay') delay: string = "0s";
  @Input('isOneTime') isOneTime: boolean = false;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.el.nativeElement.style.opacity = entry.isIntersecting ? this.opacityEnd : '0';
        this.el.nativeElement.classList.toggle(this.animationInput, entry.isIntersecting);
      });
    });
    this.observer.observe(this.el.nativeElement);
  }
}