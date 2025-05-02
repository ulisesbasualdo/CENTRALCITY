import { Component, OnInit, signal } from '@angular/core';
import { UIVCardsComponent } from '../../features/vcards/vcards.component';
import { UIVCardsHeaderComponent } from '../../features/vcards/vcards-header/vcards-header.component';
import { UIVCardComponent } from '../../features/vcards/vcards-list/vcards-list.component';
import { UIVScrollComponent } from '../../features/vcards/vscroll/vscroll.component';
import { IFiltro } from '../../features/filtro/filtro.interface';
import { DataService, IConsulta } from 'src/app/core/services/data.service';
import { IData, IDataItem } from 'src/app/core/interfaces/i-data';

@Component({
  selector: 'app-new-cards-landing',
  standalone: true,
  imports: [UIVCardsComponent, UIVCardsHeaderComponent, UIVCardComponent, UIVScrollComponent],
  template: `
    <ui-vcards>
      <ui-vcards-header [filtros]="filtros" (cambio)="obtenerDatos(null, $event)" />
      @if (datos) {
        @for (item of datos; track item) {
          <ui-vcard>
            <ng-container>
              <h2>nombre: {{ item.name || 'no-name' }}</h2>
              <p>web: {{ item.web.url || 'no-url' }}</p>
              <p>nota: {{ item.location.address || 'no-address' }}</p>
            </ng-container>
          </ui-vcard>
        }
      }
      <ui-vscroll />
    </ui-vcards>
  `,
  styles: ``,
})
export class NewCardsLandingComponent implements OnInit {
  private readonly _filtros = signal<IFiltro[]>([
    {
      key: 'salud',
      estado: 'sin-aplicar',
      content: [],
      appliedValue: null,
    },
    {
      key: 'remises',
      estado: 'sin-aplicar',
      content: [],
      appliedValue: null,
    },
  ]);
  set filtros(value: IFiltro[]) {
    this._filtros.set(value);
  }
  get filtros(): IFiltro[] {
    return this._filtros();
  }

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.obtenerDatos(null, this.filtros);
  }

  get datos(): IDataItem[] | null {
    return this.dataService.datos;
  }

  obtenerDatos(consulta: IConsulta | null = null, filtros: IFiltro[] = []): void {
    this.dataService.obtenerDatos(consulta, filtros).subscribe({
      next: (data: IData) => {
        console.log({ data });
        this.dataService.datos = data.content;
        this.filtros.forEach(filtro => {
          filtro.content = data.filtros.find(f => f.key === filtro.key)?.content ?? [];
        });
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('finalizado');
      },
    });
  }
}
