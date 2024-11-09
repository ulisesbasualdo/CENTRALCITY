import { Injectable, input, signal } from '@angular/core';
import { ISocialData } from 'src/app/core/interfaces/i-data';

@Injectable({
  providedIn: 'root'
})
export class DataViewService {

  contentSocial = signal<ISocialData | null>(null);

  get getContentSocial() {
    return this.contentSocial();
  }

}
