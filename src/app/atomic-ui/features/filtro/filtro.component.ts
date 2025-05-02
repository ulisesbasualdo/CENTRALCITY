import { Component, EventEmitter, Input, Output } from '@angular/core';
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
            <span> ~~ APLICADO ~~ </span>
            <span>{{ filtro.key }}</span>
            <button (click)="abrirCerrarDropdown()">Desplegar Dropdown</button>
          </div>
        }
        @case ('sin-aplicar') {
          <div class="filtro-sin-aplicar">
            <span>{{ filtro.key }}</span>
            <button (click)="abrirCerrarDropdown()">Desplegar Dropdown</button>
          </div>
        }
      }
      <ui-filtro-dropdown
        [filtro]="filtro"
        [mostrar]="mostrarDropdown"
        (cerrado)="cerrarDropdown()"
        (limpiar)="clean.emit($event)"
        (filtroAplicado)="cambio.emit($event)" />
    }
  `,
  styles: ``,
})
export class UIFiltroComponent {
  @Input({ required: true }) filtro!: IFiltro;
  @Output() cambio: EventEmitter<IFiltro> = new EventEmitter();
  @Output() clean: EventEmitter<IFiltro> = new EventEmitter();

  mostrarDropdown: boolean = false;

  abrirCerrarDropdown() {
    this.mostrarDropdown = !this.mostrarDropdown;
  }
  cerrarDropdown() {
    this.mostrarDropdown = false;
  }
}
