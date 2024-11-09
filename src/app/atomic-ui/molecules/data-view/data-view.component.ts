import { Component, input, OnInit, signal } from '@angular/core';
import { DataViewService } from '@utils/data-view.service';
import { IData, ISocialData } from 'src/app/core/interfaces/i-data';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [],
  template: `
    @if(socialData()){
      <div 
      [class.display-block]="socialData()"
      [class.display-none]="!socialData()"
      class="data-view">
        @if(socialData()?.username) { <p> {{socialData()?.username}} </p> }
        @if(socialData()?.name) { <p> {{socialData()?.name}} </p> }
        @if(socialData()?.type) { <p> {{socialData()?.type}} </p> }
        @if(socialData()?.link) { <p> {{socialData()?.link}} </p> }
        hola
      </div>
    }
  `,
  styles: `
  .display-block {
    display: block;
  }
  .display-none {
    display: none;
  }
    .data-view {
      background-color: black;
      color: white;
      border-radius: 0.5em;
      padding: 0.5em 1em;
      position: relative;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      width: 300px;
    }
    .data-view {
      background-color: black;
      color: white;
      border-radius: 0.5em;
      padding: 0.5em 1em;
      position: relative;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      width: 300px;
    }
  `
})
export class DataViewComponent {

  otherData = input<IData>();
  socialData = input<ISocialData | null>();

}
