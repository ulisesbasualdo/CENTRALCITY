import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  goToLink(link: string | undefined | null): void {
    if(link && link !== '' && link.includes('http'))
    window.open(link, '_blank');
  }

}
