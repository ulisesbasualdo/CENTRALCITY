import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  output,
  SimpleChanges,
} from '@angular/core';
import { DropdownService } from '../../utils/dropdown.service';
import { Subscription } from 'rxjs';
import { ISocialData } from '../../../core/interfaces/i-data';
import { PredefinedIconService } from '@utils/predefined-icon.service';

@Component({
  selector: 'app-icon-dropdown',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="dropdown-container">
      @if( isData() ){
        <img
          class="icon-img pointer"
          (click)="[toggleDropDown($event),
            onClick.emit($event)
          ]"
          [src]="iconImg ? iconImg : ''"
          alt=""
        />
        <div
          #data
          class="social-data"
          [ngClass]="dropDownShown ? 'show' : 'hidden'"
        >
          @if(isDataString(iconDropdown.username)) 
            {<p>Usuario: {{ iconDropdown.username }}</p>}
          @if(isDataString(iconDropdown.name)) 
            {<p>Nombre: {{ iconDropdown.name }}</p>}
          @if(isDataString(iconDropdown.type)) 
            {<p>Tipo: {{ iconDropdown.type }}</p>}
          @if(isDataString(iconDropdown.link)) 
            {<p>Link: {{ iconDropdown.link }}</p>}
        </div>
      }
      @else if (customIconImg && description && onHover && externalLink) {
        <img
        class="icon-img pointer"
        (mouseover)="toggleDropDown($event)"
        (mouseout)="toggleDropDown($event)"
        (click)="goToLink(externalLink)"
        [src]="customIconImg"
        [alt]="description"
      />
        <div
        #data
        [ngClass]="[
          dropDownShown ? 'show' : 'hidden',
          onHover ? 'social-data on-hover' : 'social-data'
          ]"
      >
        <p>{{ description }}</p>
        
      </div>
      }
      @else {
      <img
        class="icon-img disabled"
        (click)="toggleDropDown($event)"
        [src]="iconImg ? iconImg : ''"
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
    border-radius: 0.5em;
    padding: 0.5em 1em;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 300px;
    &.on-hover {
      background-color: #000000cc;
    }
  }

  .social-data.on-hover:hover {
    display: block;
  }

  img.icon-img {
    width: 2em;
    height: auto;
  }
  img.icon-img.pointer {
    cursor: pointer;
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
  @Input() iconDropdown!: ISocialData;

  @Output() onClick = new EventEmitter<Event>();

  iconImg!: string | null;

  @Input() customIconImg!: string | null;
  @Input() onHover!: boolean;
  @Input() description!: string;
  @Input() externalLink!: string;

  protected dropDownShown: boolean = false;
  private dropdownId = Math.random().toString(36).substring(2, 15);
  private subscription!: Subscription;

  constructor(
    private elRef: ElementRef,
    private dropdownService: DropdownService,
    private predefinedIconService: PredefinedIconService
  ) {}

  ngOnInit() {
    this.subscription = this.dropdownService.dropdownState$.subscribe((id) => {
      if (id !== this.dropdownId) {
        this.dropDownShown = false;
      }
    });
    if(this.iconDropdown?.platform && this.iconDropdown.platform.length > 0) {
    this.predefinedIconService.defineIconImg(this.iconDropdown.platform);
    }
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
   return this.dropdownService.isData(this.iconDropdown);
  }

  isDataString(string: string | undefined): boolean {
    return string !== null && string !== undefined && string.length > 0;
  }

  

  goToLink(link: string): void {
    window.open(link, '_blank');
  }
}
