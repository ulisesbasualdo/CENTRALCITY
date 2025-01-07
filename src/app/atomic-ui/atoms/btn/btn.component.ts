import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [],
  template: `
    <button 
      [class]="color()"
      [class.btn-sm]="size() === 'small'"
      [class.btn-lg]="size() === 'large'"
      [disabled]="disabled()"
      (click)="onClick.emit()"
    >
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
    font-family: "Zain", sans-serif;
  }
  `
})
export class BtnComponent {
  public text = input<string>('');
  public color = input<string>('default');
  public size = input<string>('default');
  public disabled = input<boolean>(false);
  public onClick = output();
}
