import { Injectable } from '@angular/core';
import { ISocialData } from 'src/app/core/interfaces/i-data';

@Injectable({
  providedIn: 'root'
})
export class PredefinedIconService {

  imgPath!: string  ;

  defineIconImg(platform: string): string {
    switch (platform) {
      case 'fb':
        this.imgPath = 'img/icons/fb.png';
        break;
      case 'ig':
        this.imgPath = 'img/icons/ig.png';
        break;
      case 'x':
        this.imgPath = 'img/icons/x.png';
        break;
      case 'yt':
        this.imgPath = 'img/icons/yt.png';
        break;
      case 'li':
        this.imgPath = 'img/icons/li.png';
        break;
      case 'tt':
        this.imgPath = 'img/icons/tt.png';
        break;
      case 'gmaps':
        this.imgPath = 'img/icons/gmaps.png';
        break;
    }
    return this.imgPath;
  }
  
}
