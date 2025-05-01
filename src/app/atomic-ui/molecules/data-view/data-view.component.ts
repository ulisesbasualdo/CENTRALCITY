import { Component, ElementRef, Input, input, viewChild } from '@angular/core';
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
    <div #dataView class="data-view" [class.visible]="shouldShow()">
      <span class="content">
        @if (socialData()?.username) {
          <div class="child-content">
            <p>{{ socialData()?.username }}</p>
            @if (buttonsRightToData) {
              <div class="btn-copy" (click)="copyText(socialData()?.username)">
                <span>c</span>
              </div>
            }
          </div>
        }
        @if (socialData()?.name) {
          <div class="child-content">
            <p>{{ socialData()?.name }}</p>
            @if (buttonsRightToData) {
              <div class="btn-copy" (click)="copyText(socialData()?.name)">
                <span>c</span>
              </div>
            }
          </div>
        }
        @if (socialData()?.type) {
          <div class="child-content">
            <p>{{ socialData()?.type }}</p>

            @if (buttonsRightToData) {
              <div class="btn-copy" (click)="copyText(socialData()?.type)">
                <span>c</span>
              </div>
            }
          </div>
        }
        @if (socialData()?.link) {
          <div class="child-content">
            <p appScrolleable [showScrollBar]="false">
              {{ socialData()?.link }}
            </p>

            @if (buttonsRightToData) {
              <div class="btn-copy" (click)="copyText(socialData()?.link)">
                <span>c</span>
              </div>
            }
          </div>
        }
      </span>

      @if (buttonsRightToData) {
        <div class="btn-common-persistents">
          <div
            #btnGoToLink
            class="btn-persistent"
            [style]="{ height: dataView.style.height + 'px' }"
            (click)="goToLink()">
            <span>i</span>
          </div>
          <div
            #btnClose
            class="btn-persistent"
            [style]="{ height: dataView.style.height + 'px' }"
            (click)="closeDataView()">
            <span>x</span>
          </div>
        </div>
      }
    </div>
    @if (shouldShow()) {
      <div
        class="btn-actions"
        appScrolleable
        [spaceInBottom]="true"
        [disableScroll]="!hasScroll()"
        [class.noScroll]="!hasScroll()">
        <app-btn text="Ir al Link" color="green" (onClick)="goToLink()" />
        <app-btn
          text="Copiar Link"
          color="blue"
          [disabled]="!socialData()?.link || socialData()?.link?.length === 0"
          (onClick)="copyText(socialData()?.link)" />
        @if (socialData()?.type === 'email') {
          <app-btn
            text="Copiar Email"
            color="blue"
            [disabled]="!socialData()?.name || socialData()?.name?.length === 0"
            (onClick)="copyText(socialData()?.name)" />
        } @else if (socialData()?.platform === 'phone') {
          <app-btn
            text="Copiar Teléfono"
            color="blue"
            [disabled]="!socialData()?.name || socialData()?.name?.length === 0"
            (onClick)="copyText(socialData()?.name)" />
        } @else if (socialData()?.platform === 'wp') {
          <app-btn
            text="Copiar Teléfono"
            color="blue"
            [disabled]="!socialData()?.name || socialData()?.name?.length === 0"
            (onClick)="copyText(socialData()?.name)" />
        } @else if (socialData()?.platform === 'gmaps') {
          <app-btn
            text="Copiar Dirección"
            color="blue"
            [disabled]="!socialData()?.name || socialData()?.name?.length === 0"
            (onClick)="copyText(socialData()?.name)" />
        } @else {
          <app-btn
            text="Copiar Nombre"
            color="blue"
            [disabled]="!socialData()?.name || socialData()?.name?.length === 0"
            (onClick)="copyText(socialData()?.name)" />
        }
        <app-btn
          text="Copiar Usuario"
          color="blue"
          [disabled]="!socialData()?.username || socialData()?.username?.length === 0"
          (onClick)="copyText(socialData()?.username)" />
      </div>
    }
  `,
  styles: `
    .data-view {
      display: none;
      background-color: #ececec;
      justify-content: space-between;
      min-width: 100%;
      border-radius: 15px;
      transition: all 0.3s ease-in-out;
      span.content {
        width: 100%;
        .child-content {
          display: flex;
          justify-content: space-between;
          overflow-x: auto;
          position: relative;
          scroll-behavior: smooth;
          margin-inline: 1em;

          p {
            margin-right: 1em;
            padding-block: 0.5em;
            max-width: 10em;
            overflow-wrap: break-word;
            white-space: nowrap;
          }
          .child-content::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }

    .visible {
      display: flex;
      animation: fadeIn 0.3s ease-in-out;
    }

    .btn-common-persistents {
      display: inline-flex;
    }
  `,
})
export class DataViewComponent {
  // input properties
  socialData = input<ISocialData | null>();
  containerIndex = input<number | null>();
  hasScroll = input<boolean>(true);
  // view child elements
  dataView = viewChild<ElementRef<HTMLDivElement>>('dataView');

  @Input()
  set buttonsRightToData(value: boolean) {
    this._buttonsRightToData = value;
  }
  get buttonsRightToData() {
    return this._buttonsRightToData;
  }
  private _buttonsRightToData!: boolean;

  constructor(
    private readonly dataViewService: DataViewService,
    private readonly linkService: LinkService,
    private readonly textService: TextService
  ) {}

  shouldShow(): boolean {
    return (
      this.containerIndex() === this.dataViewService.containerIndex() &&
      this.dataViewService.containerIndex() !== null &&
      this.socialData() !== null
    );
  }

  closeDataView() {
    this.dataViewService.containerIndex.set(null);
  }

  goToLink() {
    this.linkService.goToLink(this.socialData()?.link, false);
  }

  copyText(text: string | undefined) {
    this.textService.copyText(text);
  }
}
