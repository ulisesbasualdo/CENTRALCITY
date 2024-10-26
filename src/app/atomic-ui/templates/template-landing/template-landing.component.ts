import { Component, Input } from '@angular/core';
import { ParallaxHeroComponent } from '../../organisms/parallax-hero/parallax-hero.component';
import { TitleSubtitleComponent } from '../../atoms/title-subtitle/title-subtitle.component';
import { CardComponent } from '../../molecules/card/card.component';
import { IData, IDataPlace } from '../../../core/interfaces/i-data';

@Component({
  selector: 'app-template-landing',
  standalone: true,
  imports: [ParallaxHeroComponent, TitleSubtitleComponent, CardComponent],
  template: `
    <app-parallax-hero />
    @if(items){
      @for(item of items; track item){
        <section>
          <app-title-subtitle
            title="{{ item.name }}"
            subtitle="{{ item.description }}"
          />
          <div class="container">
            @if(item.places){ 
              @for(data of item.places; track data){
                <app-card title="{{ data.name }}">
                  <div cardBody>
                    <p>Card Body</p>
                  </div>
                  <div cardFooter>
                    <p>Card Footer</p>
                  </div>
                </app-card>
              }
            } 
          @if(item.links){
            @for(link of item.links; track link){
              <app-card title="{{ link.name }}">
                <div cardBody>
                  <p>Card Body</p>
                </div>
                <div cardFooter>
                  <p>Card Footer</p>
                </div>
              </app-card>
            } 
          }
          </div>
        </section>
      }
    }
  `,
  styles: `
    .container{
      display: flex;
      gap: 1em;
      justify-content: center;
      align-items: stretch;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
  `,
})
export class TemplateLandingComponent {
  @Input() items!: IData[];
}
