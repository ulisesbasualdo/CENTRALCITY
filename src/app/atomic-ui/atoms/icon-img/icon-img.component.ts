import { Component, computed, Input, input, output } from '@angular/core';
import { PredefinedIconService } from '@utils/predefined-icon.service';

@Component({
  selector: 'icon-img',
  standalone: true,
  imports: [],
  template: `
    <img
      class="icon-img"
      [class.pointer] = pointer()
      [class.disabled] = disabled()
      (click)="click($event)"
      [src]="getSrcPredefined ? getSrcPredefined : src()"
      [alt]="alt()"
    />
  `,
  styles: `
  img.icon-img {
    width: 2em;
    height: auto;
  }
  img.icon-img.pointer {
    cursor: pointer;
  }
  .disabled {
    filter: grayscale(100%);
    pointer-events: none;
  }
  `,
})
export class IconImgComponent {
  disabled = input<boolean>();
  pointer = input<boolean>();

  externalLink = input<string>();
  src = input<string | null>();

  private _srcPredefined!: string;

  @Input() set srcPredefined(value: string | null) {
    if (value){
      let formattedSrc: string
      formattedSrc = this.setPredefinedIcon(value);
      this._srcPredefined = formattedSrc; 
    }
  }
  get getSrcPredefined(): string {
    return this._srcPredefined;
  }

  alt = input<string | null>();
  tooltip = input<string>();

  onClick = output<Event>();

  constructor (private predefinedIconService: PredefinedIconService) {}

  setPredefinedIcon(predefined: string): string{
    predefined = this.predefinedIconService.defineIconImg(predefined);
    return predefined
  }

  click(event: Event) {
    if (this.disabled()) return;
    if (this.externalLink()) return this.goToLink(this.externalLink());
    this.onClick.emit(event);
  }

  goToLink(link: string | undefined): void {
    if (!link) return
    window.open(link, '_blank');
  }
}
