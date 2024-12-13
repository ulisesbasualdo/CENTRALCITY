import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  copyText(text: string | undefined) {
    if (!text) return;
    navigator.clipboard.writeText(text);
  }
  
}
