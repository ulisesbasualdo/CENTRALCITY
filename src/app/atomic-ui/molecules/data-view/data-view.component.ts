import {
  Component,
  effect,
  ElementRef,
  Input,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DataViewService } from '@utils/data-view.service';
import { LinkService } from '@utils/link.service';
import { TextService } from '@utils/text.service';
import { ISocialData } from 'src/app/core/interfaces/i-data';
import { BtnComponent } from '../../atoms/btn/btn.component';
import { ScrolleableContainerDirective } from '../../utils/directives/scrolleable-container.directive';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [BtnComponent, ScrolleableContainerDirective],
  template: `
    @if(displayBlock){
    <div
      #dataView
      [class.data-view]="socialData()"
      [class.visible]="socialData()"
      class="fade"
    >
      <span class="content">
        @if(socialData()?.username) {
        <div class="child-content">
          <p>{{ socialData()?.username }}</p>
          @if(buttonsRightToData){
          <div class="btn-copy" (click)="copyText(socialData()?.username)">
            <span>c</span>
          </div>
          }
        </div>
        } @if(socialData()?.name) {
        <div class="child-content">
          <p>{{ socialData()?.name }}</p>
          @if(buttonsRightToData){
          <div class="btn-copy" (click)="copyText(socialData()?.name)">
            <span>c</span>
          </div>
          }
        </div>
        } @if(socialData()?.type) {
        <div class="child-content">
          <p>{{ socialData()?.type }}</p>

          @if(buttonsRightToData){
          <div class="btn-copy" (click)="copyText(socialData()?.type)">
            <span>c</span>
          </div>
          }
        </div>
        } @if(socialData()?.link) {
        <div class="child-content" appScrolleable [showScrollBar]="false">
          <p>{{ socialData()?.link }}</p>

          @if(buttonsRightToData){
          <div class="btn-copy" (click)="copyText(socialData()?.link)">
            <span>c</span>
          </div>
          }
        </div>
        }
      </span>

      @if(buttonsRightToData){
      <div class="btn-common-persistents">
        <div
          #btnGoToLink
          class="btn-persistent"
          [style]="{ height: dataView.style.height + 'px' }"
          (click)="goToLink()"
        >
          <span>i</span>
        </div>
        <div
          #btnClose
          class="btn-persistent"
          [style]="{ height: dataView.style.height + 'px' }"
          (click)="closeDataView()"
        >
          <span>x</span>
        </div>
      </div>
      }
    </div>
      <div 
      class="btn-actions" 
      appScrolleable
      [disableScroll]="!hasScroll()"
      [class.noScroll]="!hasScroll()"
      >
        <app-btn text="Copiar Nombre" 
          (onClick)="copyText(socialData()?.name)"
        />
        <app-btn text="Copiar Usuario" 
          (onClick)="copyText(socialData()?.username)"
        />
        <app-btn text="Copiar Link" 
          (onClick)="copyText(socialData()?.link)"
        />
        <app-btn text="Ir al Link" 
          (onClick)="goToLink()"
        />
      </div>
    }
  `,
  styleUrl: './data-view.component.scss',
})
export class DataViewComponent {
  // input properties
  socialData = input<ISocialData | null>();
  containerIndex = input<number | null>();
  hasScroll = input<boolean>(true);
  // view child elements
  dataView = viewChild<ElementRef<HTMLDivElement>>('dataView');
  // local properties
  dataViewHeight!: string;
  btnCloseHeight!: string;
  displayBlock: boolean = false;

  @Input()
  set buttonsRightToData(value: boolean) {
    this._buttonsRightToData = value;
  }
  get buttonsRightToData() {
    return this._buttonsRightToData;
  }
  private _buttonsRightToData!: boolean;

  constructor(
    private dataViewService: DataViewService,
    private linkService: LinkService,
    private textService: TextService
  ) {
    effect(() => {
      if (this.containerIndex() === this.dataViewService.containerIndex()) {
        this.displayBlock = true;
      } else {
        this.displayBlock = false;
      }
    });
  }

  closeDataView() {
    this.dataView()?.nativeElement.classList.remove('visible');
    setTimeout(() => {
      this.displayBlock = false;
      this.dataViewService.containerIndex.set(null);
    }, 300);
  }

  goToLink() {
    this.linkService.goToLink(this.socialData()?.link, false);
  }

  copyText(text: string | undefined) {
    this.textService.copyText(text);
  }
}
