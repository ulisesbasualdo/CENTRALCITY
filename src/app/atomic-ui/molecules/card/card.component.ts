import { Component, computed, HostBinding, input, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
      <div class="card"
      [class.new-card]="isNewCard()">
        <div class="card-header">
          @if(title()){<h2 class="title">{{ superTitle() }}</h2>}
          @if(subtitle()){<p>{{ subtitle() }}</p>}
          @if(subtitleWarning()) {<p>{{ subtitleWarning() }}</p>}
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

  public title = input<string>();
  public superTitle = computed(() => this.title()?.toLocaleUpperCase());
  public isNewCard = input<boolean>();
  public subtitle = input<string>();
  public subtitleWarning = input<string>();


  // public isNewCard = input ( false, {
  //   transform: (value: boolean | string ) => 
  //     typeof value === 'string' ? value === '' : value,
  //   } 
  // );

}
