import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { IFiltro } from '../filtro.interface';
import { UIFiltroStoreService } from '../filtro-store.service';

@Component({
  selector: 'app-filtro-dropdown, ui-filtro-dropdown',
  standalone: true,
  imports: [],
  template: `
    <div id="filtroDropwdown" class="filtro-dropdown" [class.show]="mostrar" [class.hidden]="!mostrar">
      @for (content of filtro.content; track $index) {
        <div class="contenido">
          <span> {{ filtro.key }}: {{ content.value }} </span>
          @if (filtro.estado === 'sin-aplicar') {
            <button (click)="aplicarFiltro(filtro, content.value)">+</button>
          }
          @if (filtro.estado === 'aplicado') {
            <button (click)="limpiarFiltro(filtro)">X</button>
          }
        </div>
      }
      <!-- div.filtro-dropdown-footer -->
      <div class="dropdown-footer">
        @if (filtro.estado === 'aplicado') {
          <button (click)="limpiarFiltro(filtro)">Limpiar filtro</button>
        }
        <button (click)="cerrado.emit()">Cerrar</button>
      </div>
    </div>
  `,
  styles: `
    .filtro-dropdown {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      padding: 10px 10px 0px 10px;
      z-index: 1000;
      width: auto;
      max-height: 300px;
      overflow-y: auto;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      transition: all 0.3s ease-in-out;
      animation: fadeIn 0.3s ease-in-out;
      animation-fill-mode: forwards;
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

    .filtro-dropdown.show {
      display: flex;
      flex-direction: column;
      gap: 0.25em;
    }
    .filtro-dropdown.hidden {
      display: none;
    }
    .filtro-dropdown span {
      display: inline-block;
      margin-right: 10px;
    }
    .filtro-dropdown button {
      margin-left: 5px;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
    .filtro-dropdown button:hover {
      background-color: #0056b3;
    }
    .contenido {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dropdown-footer {
      position: sticky;
      bottom: 0px;
      background-color: #ffffff85;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0px;
      padding-block: 1rem;
      backdrop-filter: blur(2px);
    }
    .dropdown-footer button {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .dropdown-footer::before {
      content: '';
      background-color: #2196f3;
      filter: blur(35px);
      position: absolute;
      top: 35px;
      left: 0;
      right: 0;
      bottom: 0px;
      z-index: -1;
      opacity: 1;
      transition: opacity 0.3s ease;
      height: 40px;
    }

    .dropdown-footer button:hover {
      background-color: #d32f2f;
    }
  `,
})
export class UIFiltroDropdownComponent {
  @Input({ required: true }) filtro!: IFiltro;
  @Input() mostrar: boolean = false;
  @Output() filtroAplicado: EventEmitter<IFiltro> = new EventEmitter<IFiltro>();
  @Output() limpiar: EventEmitter<IFiltro> = new EventEmitter<IFiltro>();
  @Output() cerrado: EventEmitter<true> = new EventEmitter<true>();

  constructor(
    private readonly filtroStore: UIFiltroStoreService,
    private readonly elementRef: ElementRef
    // inyectar el servicio de dropdown
  ) {}

  // verifica si no hay otro dropdown abierto, si lo hay, lo cierra
  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent) {
    if (this.mostrar && !this.elementRef.nativeElement.contains(event.target)) {
      this.cerrado.emit(true);
    }
  }

  aplicarFiltro(filtro: IFiltro, value: string): void {
    filtro.appliedValue = value;
    filtro.estado = 'aplicado';
    this.filtroStore.filtro = filtro;
    this.filtroAplicado.emit(filtro);
  }

  limpiarFiltro(filtro: IFiltro): void {
    filtro.estado = 'sin-aplicar';
    this.filtroStore.filtro = filtro;
    this.limpiar.emit(filtro);
  }
}
