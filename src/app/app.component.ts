import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParallaxHeroComponent } from "./atomic-ui/organisms/parallax-hero/parallax-hero.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParallaxHeroComponent],
  template: `
    <router-outlet />
  `,
  styles: [
    `
      h1 {
        color: blue;
        text-align: center;
        font-size: 2em;
        strong {
          color: #000000;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'CENTRALCITY';
}
