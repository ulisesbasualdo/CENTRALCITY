import { AfterContentChecked, Component, EventEmitter, Input, Output } from '@angular/core';
import { UIFiltroComponent } from '../../filtro/filtro.component';
import { IFiltro } from '../../filtro/filtro.interface';
import { UIFiltroStoreService } from '../../filtro/filtro-store.service';

@Component({
  selector: 'app-vcards-header, ui-vcards-header',
  standalone: true,
  imports: [UIFiltroComponent],
  template: `
    @if (filtrosDeStore) {
      <div class="filtros-container">
        @for (filtro of filtrosDeStore; track filtro) {
          <ui-filtro [filtro]="filtro" (cambio)="emitirCambios(filtro)" (clean)="clean.emit(filtro)" />
        }
      </div>
    }
  `,
  styles: ``,
})
export class UIVCardsHeaderComponent implements AfterContentChecked {
  @Input() filtros!: IFiltro[];
  @Output() cambio: EventEmitter<IFiltro[]> = new EventEmitter<IFiltro[]>();
  @Output() clean: EventEmitter<IFiltro> = new EventEmitter<IFiltro>();

  private vistaIniciada: boolean = false; // Para evitar que se emita el evento antes de que la vista esté lista

  //revisar qué filtros hay ya aplicados y luego emitirlos

  get filtrosDeStore(): IFiltro[] {
    return this.filtroStore.filtros;
  }

  constructor(private readonly filtroStore: UIFiltroStoreService) {}

  ngAfterContentChecked(): void {
    if (this.vistaIniciada) {
      return;
    }
    if (this.filtros) {
      this.filtroStore.filtros = this.filtros;
      this.vistaIniciada = true;
    }
  }

  emitirCambios(filtro: IFiltro): void {
    // agregar a la signal<IFiltro[]> del servicio store el filtro que se ha cambiado

    this.filtroStore.filtro = filtro;

    this.cambio.emit(this.filtroStore.filtros);
  }
}
