import { NgStyle } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Inject,
  input,
  OnChanges,
  OnInit,
  Renderer2,
  signal,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { DataViewService } from '@utils/data-view.service';
import { IData, ISocialData } from 'src/app/core/interfaces/i-data';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [],
  template: `
    @if(displayBlock){
    <div
      #dataView
      [class.display-block]="socialData()"
      [class.data-view]="socialData()"
      [class.display-none]="!socialData()"
    >
      <span class="content">
        @if(socialData()?.username) {
        <div class="child-content">
          <p>{{ socialData()?.username }}</p>
          <div #btCopy class="btn-copy" (click)="copyText(socialData()?.username)">
            <span>c</span>
          </div>
        </div>
        } @if(socialData()?.name) {
        <div class="child-content">
          <p>{{ socialData()?.name }}</p>
          <div #btCopy class="btn-copy" (click)="copyText(socialData()?.name)">
            <span>c</span>
          </div>
        </div>
        } @if(socialData()?.type) {
        <div class="child-content">
          <p>{{ socialData()?.type }}</p>
          <div #btCopy class="btn-copy" (click)="copyText(socialData()?.type)">
            <span>c</span>
          </div>
        </div>
        } @if(socialData()?.link) {
        <div class="child-content">
          <p>{{ socialData()?.link }}</p>
          <div #btCopy class="btn-copy" (click)="copyText(socialData()?.link)">
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
export class DataViewComponent implements OnChanges {
  otherData = input<IData>();
  socialData = input<ISocialData | null>();
  containerIndex = input<number | null>();

  dataView = viewChild<ElementRef<HTMLDivElement>>('dataView');
  btnClose = viewChild<ElementRef<HTMLDivElement>>('btnClose');
  dataViewHeight!: string;
  btnCloseHeight!: string;

  displayBlock: boolean = false;

  constructor(
    private dataViewService: DataViewService,
    private renderer: Renderer2
  ) {
    effect(() => {
      if (this.containerIndex() === this.dataViewService.containerIndex()) {
        this.displayBlock = true;
        this.updateBtnCloseHeight();
      } else {
        this.displayBlock = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateBtnCloseHeight();
  }

  private updateBtnCloseHeight() {
    this.dataViewHeight = `${this.dataView()?.nativeElement.offsetHeight}px`;
    this.btnCloseHeight = this.dataViewHeight;
  }

  closeDataView() {
    this.displayBlock = false;
    this.dataViewService.containerIndex.set(null);
  }

  goToLink() {
    window.open(this.socialData()?.link, '_blank');
  }

  copyText(text: string | undefined) {
    if (!text) return;
    navigator.clipboard.writeText(text);
  }
}
