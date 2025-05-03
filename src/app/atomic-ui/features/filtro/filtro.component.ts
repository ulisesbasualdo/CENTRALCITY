import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IFiltro } from './filtro.interface';
import { UIFiltroDropdownComponent } from './filtro-dropdown/filtro-dropdown.component';

@Component({
  selector: 'app-filtro, ui-filtro',
  standalone: true,
  imports: [UIFiltroDropdownComponent],
  template: `
    @if (filtro) {
      @switch (filtro.estado) {
        @case ('aplicado') {
          <div class="filtro-aplicado">
            <button (click)="abrirCerrarDropdown()">
              <span> ~~ APLICADO ~~ </span><span>{{ filtro.key }}</span>
            </button>
          </div>
        }
        @case ('sin-aplicar') {
          <div class="filtro-sin-aplicar">
            <button (click)="abrirCerrarDropdown()">
              <span>{{ filtro.key }}</span>
            </button>
          </div>
        }
      }
      <ui-filtro-dropdown
        #filtroDropdown
        [filtro]="filtro"
        [mostrar]="mostrarDropdown"
        (cerrado)="abrirCerrarDropdown()"
        (limpiar)="clean.emit($event)"
        (filtroAplicado)="cambio.emit($event)" />
    }
  `,
  styles: `
    .filtro-aplicado {
      background-color: #d4edda;
      color: #155724;
      padding: 0.5em;
      border-radius: 0.25em;
      border: 1px solid #c3e6cb;
      cursor: pointer;
    }
    .filtro-sin-aplicar {
      background-color: #f8d7da;
      color: #721c24;
      padding: 0.5em;
      border-radius: 0.25em;
      border: 1px solid #f5c6cb;
      cursor: pointer;
    }
    .filtro-aplicado:hover,
    .filtro-sin-aplicar:hover {
      background-color: #e2e3e5;
      color: #383d41;
      border-color: #b8c2cc;
      cursor: pointer;
    }
    .filtro-aplicado span,
    .filtro-sin-aplicar span {
      font-weight: bold;
      margin-right: 0.5em;
    }
    .filtro-aplicado button,
    .filtro-sin-aplicar button {
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      padding: 0;
      outline: inherit;
    }
    .filtro-aplicado button:hover,
    .filtro-sin-aplicar button:hover {
      color: #0056b3;
    }
  `,
})
export class UIFiltroComponent {
  @ViewChild('filtroDropdown') filtroDropdownInHTML!: UIFiltroDropdownComponent;
  @Input({ required: true }) filtro!: IFiltro;
  @Output() cambio: EventEmitter<IFiltro> = new EventEmitter();
  @Output() clean: EventEmitter<IFiltro> = new EventEmitter();

  mostrarDropdown: boolean = false;

  constructor() {}

  abrirCerrarDropdown() {
    // Si vamos a abrir el dropdown
    this.mostrarDropdown = !this.mostrarDropdown;
  }
}
