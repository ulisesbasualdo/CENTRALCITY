import { Component, effect, ElementRef, Input, signal, viewChild, viewChildren, OnDestroy } from '@angular/core';
import { ParallaxHeroComponent } from '../../organisms/parallax-hero/parallax-hero.component';
import { TitleSubtitleComponent } from '../../atoms/title-subtitle/title-subtitle.component';
import { CardComponent } from '../../molecules/card/card.component';
import { IData, ISocialData } from '../../../core/interfaces/i-data';
import { DataViewComponent } from '../../molecules/data-view/data-view.component';
import { DataViewService } from '@utils/data-view.service';
import { ScrolleableContainerDirective } from '@utils/directives/scrolleable-container.directive';
import { IconImgComponent } from '../../atoms/icon-img/icon-img.component';
import { NewCardsLandingComponent } from '../new-cards-landing/new-cards-landing.component';

@Component({
  selector: 'app-template-landing',
  standalone: true,
  imports: [
    ParallaxHeroComponent,
    TitleSubtitleComponent,
    CardComponent,
    DataViewComponent,
    ScrolleableContainerDirective,
    IconImgComponent,
    NewCardsLandingComponent,
  ],
  template: `
    <!-- @if (data) { -->
    <!-- <app-parallax-hero /> -->
    <section>
      <app-new-cards-landing />
    </section>
    <!-- @for (item of data; track item; let itemIndex = $index) {
        <section>
          <app-title-subtitle [title]="item.name" [subtitle]="item.description" />
          <div class="container">
            @for (dataItem of item.content; track dataItem; let dataItemIndex = $index) {
              <app-card
                #card
                [isNewCard]="dataItem.newCard"
                [title]="dataItem.name"
                [containerIndex]="formatContainerIndex(itemIndex, dataItemIndex)">
                <div cardBody class="inline-block">
                  <div class="icon-container">
                    <div class="icon-scroll" appScrolleable [spaceInBottom]="true">
                      <div #iconWrapper class="icon-wrapper">
                        @for (dataSocial of dataItem.social; track dataSocial; let j = $index) {
                          <app-icon-img
                            [pointer]="true"
                            [srcPredefined]="dataSocial.platform"
                            [alt]="dataSocial.platform"
                            (clickEvent)="setDataViewAndContainer(itemIndex, dataSocial, dataItemIndex, j)" />
                        }
                      </div>
                    </div>
                  </div>
                  <app-data-view
                    [socialData]="socialData"
                    [containerIndex]="formatContainerIndex(itemIndex, dataItemIndex)"
                    style="min-width: 100%;" />
                </div>
                <div cardFooter></div>
              </app-card>
            }
          </div>
        </section>
      }
    } @else {
      <h2>Ha sucedido un error temporal, estamos trabajando en resolverlo.</h2>
    } -->
  `,
  styles: [
    `
      .container {
        display: flex;
        gap: 1em;
        margin-top: 2rem;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
      .inline-block {
        > * {
          padding-block: 0.5em;
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;
        }
        img.icon {
          width: 2em;
          height: auto;
        }
      }
      .icon-container {
        width: 100%;
      }

      .icon-scroll {
        cursor: pointer;
        // background-color: #ececec;
        border-radius: 15px;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        user-select: none;
      }

      .icon-wrapper {
        display: flex;
        gap: 0.75em;
        padding: 0.5em;
        -webkit-user-select: none;
        user-select: none;
        position: relative;
      }
      app-icon-img {
        display: contents;
      }

      .nav-btn {
        background: #4190ff;
        border: none;
        color: white;
        padding: 0.5em;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: #ffde59;
        }
      }
      @media (max-width: 768px) {
        .inline-block {
          > * {
            padding-block: 0.5em;
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
          }
          img.icon {
            width: 2em;
            height: auto;
          }
        }
      }
      @media (max-width: 480px) {
        .inline-block {
        }
      }
    `,
  ],
})
export class TemplateLandingComponent implements OnDestroy {
  @Input() data!: IData[];
  cardComponents = viewChildren<CardComponent>('card');

  iconWrapper = viewChild<ElementRef>('iconWrapper');
  hasOverflow = signal(false);
  private resizeObserver?: ResizeObserver;

  containerIndex = signal<number>(0);
  contentIndex = signal<number>(0);

  public socialData!: ISocialData | null;

  constructor(private dataViewService: DataViewService) {
    effect(() => {
      if (this.iconWrapper()) {
        this.setupResizeObserver();
      }
      this.socialData = this.dataViewService.contentSocial();
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  handleMouseWheel(event: WheelEvent) {
    const container = event.currentTarget as HTMLElement;
    event.preventDefault();

    container.scrollLeft += event.deltaY;
  }

  private setupResizeObserver(): void {
    this.resizeObserver?.disconnect();

    this.resizeObserver = new ResizeObserver(() => {
      const element = this.iconWrapper()?.nativeElement;
      if (element) {
        this.hasOverflow.set(element.scrollWidth > element.clientWidth);
      }
    });

    this.resizeObserver.observe(this.iconWrapper()!.nativeElement);
  }

  setDataViewAndContainer(itemIndex: number, data: ISocialData, dataItemIndex: number, contentIndex: number) {
    const formatedContainerIndex = this.formatContainerIndex(itemIndex, dataItemIndex);

    // Actualizar el servicio con todos los parámetros correctos
    this.dataViewService.setDataViewAndContainer(data, formatedContainerIndex, contentIndex);

    // Actualizar los signals locales
    this.containerIndex.set(formatedContainerIndex);
    this.contentIndex.set(contentIndex);
  }

  formatContainerIndex(itemIndex: number, dataItemIndex: number): number {
    const result = itemIndex.toString() + dataItemIndex.toString();
    return parseInt(result);
  }

  isDataViewVisible(itemIndex: number, dataItemIndex: number): boolean {
    return this.containerIndex() === this.formatContainerIndex(itemIndex, dataItemIndex);
  }

  scrollIcons(direction: 'left' | 'right', event: Event) {
    const container = (event.target as HTMLElement).parentElement?.querySelector('.icon-scroll') as HTMLElement;
    const scrollAmount = 100;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }

  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  startDragging(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    const container = event.currentTarget as HTMLElement;
    this.scrollLeft = container.scrollLeft;

    if (event instanceof MouseEvent) {
      this.startX = event.pageX - container.offsetLeft;
    } else {
      this.startX = event.touches[0].pageX - container.offsetLeft;
    }
  }

  drag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    event.preventDefault();

    const container = event.currentTarget as HTMLElement;
    const x =
      event instanceof MouseEvent ? event.pageX - container.offsetLeft : event.touches[0].pageX - container.offsetLeft;

    const walk = (x - this.startX) * 2;
    container.scrollLeft = this.scrollLeft - walk;
  }

  stopDragging() {
    this.isDragging = false;
  }
}
