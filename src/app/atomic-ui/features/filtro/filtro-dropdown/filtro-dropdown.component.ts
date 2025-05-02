import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFiltro } from '../filtro.interface';
import { UIFiltroStoreService } from '../filtro-store.service';

@Component({
  selector: 'app-filtro-dropdown, ui-filtro-dropdown',
  standalone: true,
  imports: [],
  template: `
    <div class="filtro-dropdown" [class.show]="mostrar" [class.hidden]="!mostrar">
      @for (content of filtro.content; track $index) {
        <span> {{ filtro.key }}: {{ content.value }} </span>
        <button (click)="aplicarFiltro(filtro, content.value)">+</button>
        @if (filtro.estado === 'aplicado') {
          <button (click)="limpiar.emit(filtro)">X</button>
        }
      }
      <button (click)="limpiarFiltro(filtro)">Limpiar filtro</button>
      <button (click)="cerrado.emit()">Cerrar</button>
    </div>
  `,
  styles: `
    .filtro-dropdown {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      padding: 10px;
      z-index: 1000;
    }
    .filtro-dropdown.show {
      display: block;
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
  `,
})
export class UIFiltroDropdownComponent {
  @Input({ required: true }) filtro!: IFiltro;
  @Input() mostrar: boolean = false;
  @Output() filtroAplicado: EventEmitter<IFiltro> = new EventEmitter<IFiltro>();
  @Output() limpiar: EventEmitter<IFiltro> = new EventEmitter<IFiltro>();
  @Output() cerrado: EventEmitter<true> = new EventEmitter<true>();

  constructor(private readonly filtroStore: UIFiltroStoreService) {}

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
