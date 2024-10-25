import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
      <div class="card">
        <div class="card-header">
          <h3>{{ getTitle }}</h3>
          <h6>{{ getSubtitle }}</h6>
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
  private _title!: string;
  private _subtitle!: string;

  @Input() set setTitle(title: string) {
    this._title = title;
  }
  get getTitle(): string {
    return this._title;
  }

  @Input() set setSubtitle(subtitle: string) {
    this._subtitle = subtitle;
  }
  get getSubtitle(): string {
    return this._subtitle;
  }
}
