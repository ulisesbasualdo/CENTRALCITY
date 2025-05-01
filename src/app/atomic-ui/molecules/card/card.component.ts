import { Component, computed, input, viewChild } from '@angular/core';
import { DataViewComponent } from '@molecules/data-view/data-view.component';
import { ISocialData } from 'src/app/core/interfaces/i-data';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card" [class.new-card]="isNewCard()">
      <div class="card-header">
        @if (title()) {
          <h2 class="title">{{ superTitle() }}</h2>
        }
        @if (subtitle()) {
          <p>{{ subtitle() }}</p>
        }
        @if (subtitleWarning()) {
          <p>{{ subtitleWarning() }}</p>
        }
      </div>
      <div class="card-body">
        <ng-content select="[cardBody]"></ng-content>
      </div>
      <ng-content select="[dataView]"></ng-content>
      <div class="card-footer">
        <ng-content select="[cardFooter]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
  styles: [
    `
      :host {
        display: contents;
      }
      @media (max-width: 768px) {
        :host {
          flex: 1 1 calc(50% - 2em);
        }
      }
      @media (max-width: 480px) {
        :host {
          flex: 1 1 calc(100% - 2em);
        }
      }
    `,
  ],
})
export class CardComponent {
  public title = input<string>();
  public superTitle = computed(() => this.title()?.toLocaleUpperCase());
  public isNewCard = input<boolean>();
  public subtitle = input<string>();
  public subtitleWarning = input<string>();
  public dataView = input<DataViewComponent>();
  public socialData!: ISocialData | null;

  public containerIndex = input<number | null>();

  public contentIndex = input<number>();

  public containerContentDictionary: { [key: number]: number } = {};

  public currentCard = viewChild(CardComponent);
}
