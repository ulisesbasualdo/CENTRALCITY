import { ChangeDetectionStrategy, Component, effect, Input, signal, viewChild, viewChildren } from '@angular/core';
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
    DataViewComponent,
    IconImgComponent
],
  template: `
    @if(data){ 
      <app-parallax-hero />
      @for(item of data; track item; let itemIndex = $index){
        <section>
          <app-title-subtitle
            [title]=item.name
            [subtitle]=item.description
          />
          <div class="container">
            @for(dataItem of item.dataItems; track dataItem; let dataItemIndex = $index;){
              <app-card #card
                [isNewCard]=dataItem.newCard 
                [title]=dataItem.name
                [containerIndex]="formatContainerIndex(itemIndex, dataItemIndex)"

              >
                <div cardBody class="inline-block">
                  <div>
                    @for(dataSocial of dataItem.social; track dataSocial; let j = $index){
                      <icon-img 
                        [srcPredefined]=dataSocial.platform
                        [alt]=dataSocial.platform
                        (onClick)="setDataViewAndContainer(itemIndex, dataSocial, dataItemIndex, j)"
                      />
                    }
                  </div>
                  <app-data-view 
                  [socialData]=socialData
                  [containerIndex]="formatContainerIndex(itemIndex, dataItemIndex)" 
                  class="fade"
                  [class.visible]="isDataViewVisible(itemIndex, dataItemIndex)"
                  style="min-width: 100%;"
                  />
                  
                </div>
                <div cardFooter></div>
              </app-card>
            }
          </div>
        </section>
      } 
    }
    @else {
      <h2>Ha sucedido un error temporal, estamos trabajando en resolverlo.</h2>
    }
  `,
  styles: [
    `
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
        display: flex;
        justify-content: space-evenly;
      }
      img.icon {
        width: 2em;
        height: auto;
      }
    }
    `
  ],
})
export class TemplateLandingComponent {
  @Input() data!: IData[];
  cardComponents = viewChildren<CardComponent>('card');

  containerIndex = signal<number>(0);
  contentIndex = signal<number>(0);

  public socialData!: ISocialData | null;
  
  constructor (private dataViewService: DataViewService) {
    effect(() => {
      this.socialData = this.dataViewService.contentSocial();
    })
  }
  
  setDataViewAndContainer(itemIndex:number, data: ISocialData, dataItemIndex: number, content: number) {
    this.dataViewService.contentSocial.set(data);
    let formatedContainerIndex = this.formatContainerIndex(itemIndex, dataItemIndex);

    this.dataViewService.containerIndex.set(formatedContainerIndex);
    this.containerIndex.set(formatedContainerIndex);
  }

  formatContainerIndex(itemIndex:number,dataItemIndex:number): number {
    let result = itemIndex.toString() + dataItemIndex.toString();
    return parseInt(result);
  }

  isDataViewVisible(itemIndex: number, dataItemIndex: number): boolean {
    return this.containerIndex() === this.formatContainerIndex(itemIndex, dataItemIndex);
  }

}
