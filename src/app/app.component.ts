import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title }} my friend!</h1>
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
