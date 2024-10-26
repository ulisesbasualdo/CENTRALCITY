import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-subtitle',
  standalone: true,
  imports: [],
  template: ` 
  <h2>{{title}}</h2>
  <p>{{subtitle}}</p>
   `,
  styles: ``,
})
export class TitleSubtitleComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}
