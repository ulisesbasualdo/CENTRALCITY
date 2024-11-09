import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ParallaxHeroComponent } from '../../organisms/parallax-hero/parallax-hero.component';
import { TitleSubtitleComponent } from '../../atoms/title-subtitle/title-subtitle.component';
import { CardComponent } from '../../molecules/card/card.component';
import { IData, ISocialData } from '../../../core/interfaces/i-data';
import { IconDropdownComponent } from '../../molecules/icon-dropdown/icon-dropdown.component';
import { DataViewComponent } from "../../molecules/data-view/data-view.component";
import { IconImgComponent } from "../../atoms/icon-img/icon-img.component";
import { DataViewService } from '@utils/data-view.service';

@Component({
  selector: 'app-template-landing',
  standalone: true,
  imports: [
    ParallaxHeroComponent,
    TitleSubtitleComponent,
    CardComponent,
    IconDropdownComponent,
    DataViewComponent,
    IconImgComponent
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
                <app-card 
                [isNewCard]=dataItem.newCard 
                [title]=dataItem.name
                >
                  <div cardBody class="inline-block">
                    <div>
                      @if(dataItem.location){ 
                        @if(dataItem.location.googleMapsLink){
                            <app-icon-dropdown 
                              [onHover]="true"
                              [description]="'Ver ubicación de ' + dataItem.name + ' en Google Maps'"
                              [customIconImg]="'img/icons/gmaps.png'"
                              [externalLink]="dataItem.location.googleMapsLink"
                            />
                        } 
                      }
                      @if(dataItem.phone) { 
                        <app-icon-dropdown 
                              [onHover]="true"
                              [description]="'Haz click para llamar a ' + dataItem.name "
                              [customIconImg]="'img/icons/tel.png'"
                              [externalLink]="dataItem.phone.link"
                        />
                      }
                    </div>
                    @if(dataItem.social){
                        @for(dataSocial of dataItem.social; track dataSocial){
                          @if (dataSocial.platform && dataSocial.platform.length > 0) {
                            <icon-img 
                            [srcPredefined]="dataSocial.platform"
                            [alt]="dataSocial.platform"
                            (onClick)="setSocialDataInDataView(dataSocial)"
                            />
                            <!-- <img 
                              class = "icon"
                              (click)="dataViewContent.set(dataSocial) " 
                              src="{{defineIconImg(dataSocial.platform)}}" alt=""
                            > -->
                          }
                        }
                    }
                  <app-data-view [socialData]="getContentSocial()" />
                  </div>
                  <div cardFooter>
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
      align-items: stretch;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
  .inline-block {
    div{
        *{
          display: inline-block;
          padding-right: 1em;
        }
    }
    > * {
    padding-block: 0.5em;
    padding-right: 1em;
}
img.icon {
    width: 2em;
    height: auto;
  }
  }
  `,
})
export class TemplateLandingComponent {
  @Input() data!: IData[];

  constructor (private dataViewService: DataViewService) {}
  
  setSocialDataInDataView(data: ISocialData) {
    this.dataViewService.contentSocial.set(data);
  }
  getContentSocial() {
    return this.dataViewService.contentSocial();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
