import { Component, Input } from '@angular/core';
import { ParallaxHeroComponent } from '../../organisms/parallax-hero/parallax-hero.component';
import { TitleSubtitleComponent } from '../../atoms/title-subtitle/title-subtitle.component';
import { CardComponent } from '../../molecules/card/card.component';
import { IData } from '../../../core/interfaces/i-data';
import { IconDropdownComponent } from '../../molecules/icon-dropdown/icon-dropdown.component';

@Component({
  selector: 'app-template-landing',
  standalone: true,
  imports: [
    ParallaxHeroComponent,
    TitleSubtitleComponent,
    CardComponent,
    IconDropdownComponent,
  ],
  template: `
    <app-parallax-hero />
    @if(data){ 
      @for(item of data; track item){
        <section>
          <app-title-subtitle
            title="{{ item.name }}"
            subtitle="{{ item.description }}"
          />
          <div class="container">
            @if(item.dataItems){ 
              @for(dataItem of item.dataItems; track dataItem){
                <app-card title="{{ dataItem.name }}">
                  <div cardBody class="inline-block">
                    <div>
                      @if(dataItem.location){ 
                        @if(dataItem.location.address){
                          <p>{{ dataItem.location.address }}</p>
                        } 
                        @if(dataItem.location.googleMapsLink){
                            <app-icon-dropdown 
                              [onHover]="true"
                              [description]="'Ver ubicación de ' + dataItem.name + ' en Google Maps'"
                              [customIconImg]="'img/icons/gmaps.png'"
                              [externalLink]="dataItem.location.googleMapsLink"
                            />
                        } 
                      }
                    </div>
                    <div>
                      @if(dataItem.phone) { 
                        @if(dataItem.phone.number){
                          <p>{{ dataItem.phone.number }}</p>
                        } 
                        @if(dataItem.phone.link){
                          <a href="{{ dataItem.phone.link }}">Llamar</a>
                        } 
                      }
                    </div>
                    @if(dataItem.social){
                      @if(dataItem.social.length > 0){
                        @for(dataSocial of dataItem.social; track dataSocial){
                          <app-icon-dropdown
                            [iconDropdown]="{
                              platform: dataSocial.platform,
                              username: dataSocial.username,
                              name: dataSocial.name,
                              type: dataSocial.type,
                              link: dataSocial.link,
                            }"
                          />
                        }
                      }
                    }
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
  .inline-block {
    div{
        *{
          display: inline-block;
          padding-inline: 1em;
        }
    }
  }
  `,
})
export class TemplateLandingComponent {
  @Input() data!: IData[];

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
