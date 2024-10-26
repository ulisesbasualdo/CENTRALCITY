import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
      <div class="card">
        <div class="card-header">
          <h2 class="title">{{ title }}</h2>
          <p>{{ subtitle }}</p>
          <p>{{ subtitleWarning }}</p>
        </div>
        <div class="card-body">
          <ng-content select="[cardBody]"></ng-content>
        </div>
        <div class="card-footer">
          <ng-content select="[cardFooter]"></ng-content>
        </div>
      </div>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() subtitleWarning!: string;
}
