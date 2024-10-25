import { Component } from '@angular/core';
import { ParallaxHeroComponent } from '../../organisms/parallax-hero/parallax-hero.component';
import { CardComponent } from '../../molecules/card/card.component';

@Component({
  selector: 'app-page-landing',
  standalone: true,
  imports: [ParallaxHeroComponent, CardComponent],
  template: `
    <app-parallax-hero />
    <div class="container">
      <app-card setTitle="Card Title" setSubtitle="Card Subtitle" />
      <app-card setTitle="Card Title 2" setSubtitle="Card Subtitle 2">
        <div cardBody>
          <p>Card Body</p>
        </div>
        <div cardFooter>
          <p>Card Footer</p>
        </div>
      </app-card>
    </div>
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
export class PageLandingComponent {}
