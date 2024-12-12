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
  imports: [NgStyle],
  template: `
    @if(displayBlock){
    <div
      #dataView
      [class.display-block]="socialData()"
      [class.display-none]="!socialData()"
      class="data-view"
    >
    <span class="content">
      @if(socialData()?.username) {
      <p>{{ socialData()?.username }}</p>
      } @if(socialData()?.name) {
      <p>{{ socialData()?.name }}</p>
      } @if(socialData()?.type) {
      <p>{{ socialData()?.type }}</p>
      } @if(socialData()?.link) {
      <p>{{ socialData()?.link }}</p>}
    </span>	
      <div
        #btnClose
        class="btn-close"
        [style]="{ height: dataView.style.height + 'px' }"
        (click)="(!displayBlock)"
      >
        <span>x</span>
      </div>
    </div>
    }
  `,
  styles: `
  .btn-close {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #000000;
    z-index: 9999;
    font-size: 1.3em;
    font-weight: 800;
    background-color: #2196F3;
    width: 2em;
}
  
  .display-block {
    display: block;
  }
  .display-none {
    display: none;
  }
  .data-view {
    display: flex;
    background-color: black;
    color: white;
    padding-left: 1.25rem;
    justify-content: space-between;
  }

  data-view-rounded {
    display: flex;
    background-color: #000000;
    color: white;
    border-radius: 15% 0% 15% 0%;
    padding: 0.5em 1em;
    position: relative;
    top: 100%;
    left: 46%;
    transform: translateX(-50%);
    z-index: 1;
    width: 100%;
    border-color: #2196f3;
    border-style: solid;
    border-width: 0.4rem;
    .btn-close{
        border-radius: 20% 0% 20% 0%;
      }
    }
  
  `,
})
export class DataViewComponent implements OnChanges, AfterViewInit {
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
      // console.log(this.containerIndex(), this.dataViewService.containerIndex())
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateBtnCloseHeight();
  }

  ngAfterViewInit(): void {
    // this.dataViewHeight.set(this.dataView()?.nativeElement.offsetHeight + 'px');
  }

  private updateBtnCloseHeight() {
    // do{
    // this.dataViewHeight = `${this.dataView()?.nativeElement.offsetHeight}px`;
    // this.btnCloseHeight = this.dataViewHeight;}
    // while(!this.dataView())
    // console.log('sucedio un cambio')
    this.dataViewHeight = `${
      this.dataView()?.nativeElement.offsetHeight
    }px`;
    this.btnCloseHeight = this.dataViewHeight;
  }
}
