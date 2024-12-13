import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { DataViewService } from '@utils/data-view.service';
import { LinkService } from '@utils/link.service';
import { TextService } from '@utils/text.service';
import { ISocialData } from 'src/app/core/interfaces/i-data';
@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [],
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
          <div class="btn-copy" (click)="copyText(socialData()?.username)">
            <span>c</span>
          </div>
        </div>
        } @if(socialData()?.name) {
        <div class="child-content">
          <p>{{ socialData()?.name }}</p>
          <div class="btn-copy" (click)="copyText(socialData()?.name)">
            <span>c</span>
          </div>
        </div>
        } @if(socialData()?.type) {
        <div class="child-content">
          <p>{{ socialData()?.type }}</p>
          <div class="btn-copy" (click)="copyText(socialData()?.type)">
            <span>c</span>
          </div>
        </div>
        } @if(socialData()?.link) {
        <div class="child-content">
          <p>{{ socialData()?.link }}</p>
          <div class="btn-copy" (click)="copyText(socialData()?.link)">
            <span>c</span>
          </div>
        </div>
        }
      </span>
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
    </div>
    }
  `,
  styleUrl: './data-view.component.scss',
})
export class DataViewComponent {
  // input properties
  socialData = input<ISocialData | null>();
  containerIndex = input<number | null>();
  // view child elements
  dataView = viewChild<ElementRef<HTMLDivElement>>('dataView');
  // local properties
  dataViewHeight!: string;
  btnCloseHeight!: string;
  displayBlock: boolean = false;

  constructor(
    private dataViewService: DataViewService,
    private linkService: LinkService,
    private textService: TextService,
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
    this.linkService.goToLink(this.socialData()?.link);
  }

  copyText(text: string | undefined) {
    this.textService.copyText(text);
  }
}
