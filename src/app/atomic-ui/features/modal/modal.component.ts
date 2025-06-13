import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { BtnComponent } from '@atoms/btn/btn.component';

@Component({
  selector: 'app-ui-modal, ui-modal',
  standalone: true,
  imports: [BtnComponent],
  template: `
    @if (abierto) {
      <div #uiModalContainerHTML class="ui-modal-container">
        <div class="ui-modal-content">
          <div class="ui-modal-header">
            <div class="ui-modal-title">
              <h2>{{ title }}</h2>
            </div>
            <div class="ui-modal-close" (click)="close()">
              <span>&times;</span>
            </div>
          </div>
          <div class="ui-modal-content">
            <ng-content class="ui-modal-body"></ng-content>
          </div>
          <div class="ui-modal-footer">
            <ui-btn
              (click)="close()"
              [color]="'bgGrayTxtBlue'"
              [text]="'Cerrar'">
            </ui-btn>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .ui-modal-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.3s ease-in-out;
    }
    .ui-modal-content {
      background-color: #fff;
      border-radius: 1em;
      margin: 1em;
      .ui-modal-body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        overflow-y: auto;
        max-height: 60vh; /* Limita la altura del contenido */
      }
    }
    .ui-modal-header {
      background-color: #f1f1f1;
      padding: 1em;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 1em 1em 0 0;
      .ui-modal-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2 {
          margin: 0;
          font-size: 1.5em;
          color: #333;
        }
      }
      .ui-modal-close {
        cursor: pointer;
        font-size: 1.5em;
        color: #333;
        &:hover {
          color: #ff0000;
        }
      }
    }
    .ui-modal-footer {
      background-color: #f1f1f1;
      padding: 1em;
      border-top: 1px solid #ccc;
      text-align: right;
      border-radius: 0 0 1em 1em;
    }
    .ui-modal-footer button {
      padding: 0.5em 1em;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 0.25em;
      cursor: pointer;
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(-10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes fadeOut {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
    .fade-out {
      animation: fadeOut 0.3s ease-in-out forwards;
    }
  `,
})
export class UIModalComponent {
  @ViewChild('uiModalContainerHTML')
  uiModalContainerHTML!: ElementRef<HTMLDivElement>;

  abierto: boolean = false;

  @Input() title: string = '';

  open(): void {
    this.abierto = true;
  }
  close(): void {
    const modal = this.uiModalContainerHTML;
    if (modal) {
      modal.nativeElement.classList.add('fade-out');
      setTimeout(() => {
        this.abierto = false;
      }, 300); // Debe coincidir con la duración de la animación (0.3s = 300ms)
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.abierto) return;
    const modalContent =
      this.uiModalContainerHTML?.nativeElement.querySelector(
        '.ui-modal-content'
      );
    if (modalContent && !modalContent.contains(event.target as Node)) {
      this.close();
    }
  }
}
