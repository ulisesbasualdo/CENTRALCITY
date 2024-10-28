import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private dropdownState = new Subject<string | null>();
  dropdownState$ = this.dropdownState.asObservable();

  setDropdownState(id: string | null) {
    this.dropdownState.next(id);
  }

}
