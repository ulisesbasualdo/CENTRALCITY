import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DropdownService } from '../../utils/dropdown.service';
import { Subscription } from 'rxjs';

export interface IconDropdown {
  iconImg?: string;
  dropdownData?: DropdownData;
  platform?: string;
}

export interface DropdownData {
  username?: string;
  name?: string;
  type?: string;
  link?: string;
}

@Component({
  selector: 'app-icon-dropdown',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="dropdown-container">
      @if( isData() ){
      <img
        class="icon-img"
        (click)="toggleDropDown($event)"
        [src]="iconDropdown.iconImg"
        alt=""
      />
      <div
        #data
        class="social-data"
        [ngClass]="dropDownShown ? 'show' : 'hidden'"
      >
        @if(isDataString(iconDropdown.dropdownData?.username)) 
          {<p>Usuario: {{ iconDropdown.dropdownData?.username }}</p>}
        @if(isDataString(iconDropdown.dropdownData?.name)) 
          {<p>Nombre: {{ iconDropdown.dropdownData?.name }}</p>}
        @if(isDataString(iconDropdown.dropdownData?.type)) 
          {<p>Tipo: {{ iconDropdown.dropdownData?.type }}</p>}
        @if(isDataString(iconDropdown.dropdownData?.link)) 
          {<p>Link: {{ iconDropdown.dropdownData?.link }}</p>}
      </div>
      } @else {
      <img
        class="icon-img disabled"
        (click)="toggleDropDown($event)"
        [src]="iconDropdown.iconImg"
        alt=""
      />
      }
    </div>
  `,
  styles: `
  .dropdown-container {
    position: relative;
    display: inline-block;
  }
  .social-data {
    display: none;
    background-color: black;
    color: white;
    border: 1px solid black;
    padding: 0.5rem 1rem;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 300px;
  }
  img.icon-img {
    width: 2rem;
    height: auto;
  }
  .show{
    display: block;
  }
  .hidden{
    display: none;
  }
  .disabled {
    filter: grayscale(100%);
    pointer-events: none;
  }
  `,
})
export class IconDropdownComponent implements OnInit {
  @Input() iconDropdown!: IconDropdown;

  protected dropDownShown: boolean = false;
  private dropdownId = Math.random().toString(36).substring(2, 15);
  private subscription!: Subscription;

  constructor(
    private elRef: ElementRef,
    private dropdownService: DropdownService
  ) {}

  ngOnInit() {
    this.subscription = this.dropdownService.dropdownState$.subscribe((id) => {
      if (id !== this.dropdownId) {
        this.dropDownShown = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.dropDownShown = false;
    }
  }

  toggleDropDown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropDownShown = !this.dropDownShown;
    this.dropdownService.setDropdownState(
      this.dropDownShown ? this.dropdownId : null
    );
  }

  

  isData(): boolean {
   return this.dropdownService.isData(this.iconDropdown.dropdownData);
  }

  isDataString(string: string | undefined): boolean {
    return string !== null && string !== undefined && string.length > 0;
  }
}
