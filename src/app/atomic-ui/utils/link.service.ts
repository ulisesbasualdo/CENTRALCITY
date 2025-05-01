import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  goToLink(link: string | undefined | null, _blank: boolean = true): void {
    if (link && link !== '' && link.includes('http')) {
      if (_blank) {
        window.open(link, '_blank');
      } else {
        window.open(link, '_self');
      }
    }

    // if(link && link !== '' && link.includes('http'))
    // window.open(link, '_blank');
  }
}
