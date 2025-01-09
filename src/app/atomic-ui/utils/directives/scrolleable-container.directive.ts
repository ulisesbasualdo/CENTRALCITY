import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appScrolleable]',
  standalone: true,
  host: {
    class: 'scrolleable-container',
  },
})
export class ScrolleableContainerDirective {
  @Input() applyToParent = false;
  @Input() showOnHover = true;
  @Input() disableScroll = false;
  @Input() showScrollBar = true;
  @Input() set spaceInBottom(value: boolean) {
    if (value) {
      this.el.nativeElement.classList.add('with-space-in-bottom');
    } else {
      this.el.nativeElement.classList.remove('with-space-in-bottom');
    }
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.setupStyles();
  }

  private setupStyles() {
    const element = this.el.nativeElement;
    element.style.position = 'relative';
    element.style.scrollBehavior = 'smooth';
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (this.disableScroll) return;

    event.preventDefault();
    const target = this.applyToParent
      ? this.el.nativeElement.parentElement
      : this.el.nativeElement;

    if (target) {
      target.scrollLeft += event.deltaY;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.showOnHover || this.disableScroll) return;
    if (!this.showScrollBar) {
      this.el.nativeElement.classList.add('no-bar');
      return;
    }
    this.el.nativeElement.classList.add('show-scroll');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.showOnHover || this.disableScroll) return;
    this.el.nativeElement.classList.remove('show-scroll');
  }
}
