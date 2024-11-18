import { Injectable, signal } from '@angular/core';
import { ISocialData } from 'src/app/core/interfaces/i-data';

@Injectable({
  providedIn: 'root'
})
export class DataViewService {
  
  contentSocial = signal<ISocialData | null>(null);
  containerIndex = signal<number | null>(null); 
  contentIndex = signal<number>(0);

  containerContentDictionary = signal<{ [key: number]: number }>({});

  // get getContentSocial() {
  //   return this.contentSocial();
  // }

  // get getCardComponent(){
  //   return this.containerIndex.prototype
  // }

  setDataViewAndContainer(data: ISocialData, containerIndex: number, contentIndex: number   ) {
    this.contentSocial.set(data);
    this.containerIndex.set(containerIndex);
    this.contentIndex.set(contentIndex);
    this.containerContentDictionary.set({[containerIndex]: contentIndex});
  }



}
