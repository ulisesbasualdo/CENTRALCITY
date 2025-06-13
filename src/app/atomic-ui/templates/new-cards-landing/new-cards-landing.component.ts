import { Component, OnInit, signal } from '@angular/core';
import { UIVCardsComponent } from '../../features/vcards/vcards.component';
import { UIVCardsHeaderComponent } from '../../features/vcards/vcards-header/vcards-header.component';
import { UIVCardComponent } from '../../features/vcards/vcards-list/vcards-list.component';
import { UIVScrollComponent } from '../../features/vcards/vscroll/vscroll.component';
import {
  IContent,
  IFiltro,
  IFiltroResponse,
} from '../../features/filtro/filtro.interface';
import { DataService, IConsulta } from 'src/app/core/services/data.service';
import { IData, IDataItem } from 'src/app/core/interfaces/i-data';
import { UIModalComponent } from '../../features/modal/modal.component';
import { BtnComponent } from '../../atoms/btn/btn.component';
import { UIFiltroComponent } from '../../features/filtro/filtro.component';
import { CardComponent } from '../../molecules/card/card.component';

const SALUD_CONTENT: IContent[] = [
  { id: '0', value: 'Hospital Central' },
  { id: '1', value: 'Clínica Santa María' },
  { id: '2', value: 'Centro de Salud Norte' },
];
const REMISES_CONTENT: IContent[] = [
  { id: '0', value: 'Remis Rápido' },
  { id: '1', value: 'Remises del Sur' },
  { id: '2', value: 'Remis Express' },
];

const POLICIAS_CONTENT: IContent[] = [
  { id: '0', value: 'Policía Federal' },
  { id: '1', value: 'Policía Provincial' },
  { id: '2', value: 'Policía Local' },
];

const ESCUELAS_CONTENT: IContent[] = [
  { id: '0', value: 'Escuela Primaria 1' },
  { id: '1', value: 'Escuela Secundaria 2' },
  { id: '2', value: 'Escuela Técnica 3' },
];

const VETERINARIAS_CONTENT: IContent[] = [
  { id: '0', value: 'Veterinaria Mascotas Felices' },
  { id: '1', value: 'Clínica Veterinaria Salud Animal' },
  { id: '2', value: 'Centro Veterinario del Sur' },
];

const UNIVERSIDADES_CONTENT: IContent[] = [
  { id: '0', value: 'Universidad Nacional' },
  { id: '1', value: 'Universidad Tecnológica' },
  { id: '2', value: 'Universidad Privada' },
];

@Component({
  selector: 'app-new-cards-landing',
  standalone: true,
  imports: [
    UIVCardsComponent,
    UIVCardsHeaderComponent,
    UIVCardComponent,
    UIVScrollComponent,
    UIModalComponent,
    BtnComponent,
    UIFiltroComponent,
    CardComponent,
  ],
  template: `
    <div class="main">
      <ui-vcards>
        <ui-vcards-header
          [filtros]="filtros"
          (cambio)="obtenerDatos(null, $event)"
          (clean)="obtenerDatos(null, $event)">
          <div primaryActions>
            <app-btn
              (click)="uiModalHTML.open()"
              [color]="'bgGrayTxtBlue'"
              [text]="'Más Filtros'" />
          </div>
        </ui-vcards-header>

        @if (datos) {
          @for (item of datos; track item) {
            <ui-vcard>
              <ng-container class="card-container">
                <app-card
                  titleText="{{ item.name || 'no-name' }}"
                  subtitle="{{ item.web.url || 'no-url' }}"
                  subtitleWarning="{{
                    item.location.address || 'no-address'
                  }}" />
              </ng-container>
            </ui-vcard>
          }
        }

        <ui-vscroll />
      </ui-vcards>
    </div>
    <ui-modal #uiModalHTML [title]="'Modal de Filtros'">
      <div class="modal-contenido">
        @for (filtro of filtrosDeModal; track filtro) {
          <ui-filtro [filtro]="filtro" />
        }
      </div>
    </ui-modal>
  `,
  styles: `
    .main {
      padding: 1em;
      background-color: #f8f9fa;
      font-family: 'Zain', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      min-height: 100vh;
    }
    .modal-contenido {
      padding: 1em;
      width: 800px;
      height: 400px;
      display: flex;
      flex-direction: row;
      gap: 1em;
    }
    .card-container {
      display: flex;
      width: 100%;
      gap: 1em;
    }
  `,
})
export class NewCardsLandingComponent implements OnInit {
  private readonly _filtros = signal<IFiltro[]>([
    {
      key: 'salud',
      estado: 'sin-aplicar',
      content: SALUD_CONTENT,
      appliedValue: null,
    },
    {
      key: 'remises',
      estado: 'sin-aplicar',
      content: REMISES_CONTENT,
      appliedValue: null,
    },
    {
      key: 'policias',
      estado: 'sin-aplicar',
      content: POLICIAS_CONTENT,
      appliedValue: null,
    },
    {
      key: 'escuelas',
      estado: 'sin-aplicar',
      content: ESCUELAS_CONTENT,
      appliedValue: null,
    },
  ]);
  set filtros(value: IFiltro[]) {
    this._filtros.set(value);
  }
  set filtroContent(filtroArgumento: IFiltroResponse) {
    this.filtros.forEach(filtro => {
      if (filtro.key === filtroArgumento.key) {
        if (filtro.content !== filtroArgumento.content) {
          filtro.content = filtroArgumento.content;
        }
      }
    });
  }
  get filtros(): IFiltro[] {
    return this._filtros();
  }

  filtrosDeModal: IFiltro[] = [
    {
      key: 'veterinarias',
      estado: 'sin-aplicar',
      content: VETERINARIAS_CONTENT,
      appliedValue: null,
    },
    {
      key: 'universidades',
      estado: 'sin-aplicar',
      content: UNIVERSIDADES_CONTENT,
      appliedValue: null,
    },
  ];

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.obtenerDatos(null, this.filtros);
  }

  get datos(): IDataItem[] | null {
    return this.dataService.datos;
  }

  obtenerDatos(
    consulta: IConsulta | null = null,
    filtros: IFiltro[] = []
  ): void {
    this.dataService.obtenerDatos(consulta, filtros).subscribe({
      next: (data: IData) => {
        console.log({ data });
        this.dataService.datos = data.content;
        data.filtros.forEach(filtro => {
          this.filtroContent = filtro;
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
