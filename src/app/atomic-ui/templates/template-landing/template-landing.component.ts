import { AfterViewInit, Component, HostListener, Input, OnChanges, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ParallaxHeroComponent } from '../../organisms/parallax-hero/parallax-hero.component';
import { TitleSubtitleComponent } from '../../atoms/title-subtitle/title-subtitle.component';
import { CardComponent } from '../../molecules/card/card.component';
import { IData } from '../../../core/interfaces/i-data';
import { last } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { IconDropdownComponent } from "../../molecules/icon-dropdown/icon-dropdown.component";

@Component({
  selector: 'app-template-landing',
  standalone: true,
  imports: [ParallaxHeroComponent, TitleSubtitleComponent, CardComponent, IconDropdownComponent],
  template: `
    <app-parallax-hero />
    @if(data){ @for(item of data; track item){
    <section>
      <app-title-subtitle
        title="{{ item.name }}"
        subtitle="{{ item.description }}"
      />
      <div class="container">
        @if(item.dataItems){ 
          @for(dataItem of item.dataItems; track dataItem){
            <app-card title="{{ dataItem.name }}">
              <div cardBody>
                <app-icon-dropdown 
                [iconDropdown]="{
                  iconImg: 'img/icons/fb.png',
                  dropdownData: {
                    name: dataItem?.social?.facebook?.name,
                    type: dataItem?.social?.facebook?.type,
                    link: dataItem?.social?.facebook?.link,
                  },
                  platform: 'facebook'
                }"
                />
                <app-icon-dropdown 
                [iconDropdown]="{
                  iconImg: 'img/icons/ig.png',
                  dropdownData: {
                    username: dataItem?.social?.instagram?.username,
                    link: dataItem?.social?.instagram?.link,
                  },
                  platform: 'instagram'
                }"
                />
          </div>
          <div cardFooter>
            <p>Card Footer</p>
          </div>
        </app-card>
        }}
      </div>
    </section>
    } }
  `,
  styles: `
    .container{
      display: flex;
      gap: 1em;
      justify-content: center;
      align-items: stretch;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
  `,
})
export class TemplateLandingComponent {
  @Input() data!: IData[];
}
