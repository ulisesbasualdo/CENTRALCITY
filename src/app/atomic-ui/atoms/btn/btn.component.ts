import { Component, input, output } from '@angular/core';

type ButtonColor = 'blue' | 'red' | 'green' | 'default';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [],
  template: `
    <button
      [class]="color()"
      [class.btn-sm]="size() === 'small'"
      [class.btn-lg]="size() === 'large'"
      [class.blue]="color() === 'blue'"
      [class.red]="color() === 'red'"
      [class.green]="color() === 'green'"
      [class.disabled]="disabled()"
      [disabled]="disabled()"
      (click)="clickEvent.emit()">
      {{ text() }}
    </button>
  `,
  styles: `
    button {
      border: none;
      border-radius: 15px;
      padding: 10px 20px;
      cursor: pointer;
      background-color: #ececec;
      font-weight: 600;
      font-family: 'Zain', sans-serif;
      &.disabled {
        cursor: not-allowed;
        background-color: #f8f9fa;
        color: #6c757d;
      }
    }
    .blue {
      background-color: #007bff;
      color: white;
    }
    .red {
      background-color: #dc3545;
      color: white;
    }
    .green {
      background-color: #28a745;
      color: white;
    }
  `,
})
export class BtnComponent {
  public text = input<string>('');
  public color = input<ButtonColor>('default');
  public size = input<string>('default');
  public disabled = input<boolean>(false);
  public clickEvent = output();
}
