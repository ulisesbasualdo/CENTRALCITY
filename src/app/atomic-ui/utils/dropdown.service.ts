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

  isData(dropdownData: any | undefined): boolean {
    let isData: boolean = false;
    const data = dropdownData;
    if (data) {
      if (
        Object.values(data).filter(
          (value) => value !== null && value !== undefined
        ).length > 0
      ) {
        isData = true;
      }
    }
    return isData;
  }

}
