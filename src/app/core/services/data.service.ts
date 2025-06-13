import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { IData, IDataItem } from '../interfaces/i-data';
import { IFiltro } from 'src/app/atomic-ui/features/filtro/filtro.interface';

export interface IConsulta {
  ciudad: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly _datos = signal<IDataItem[] | null>(null);
  set datos(value: IDataItem[] | null) {
    this._datos.set(value);
  }
  get datos() {
    return this._datos();
  }

  constructor(private readonly _http: HttpClient) {}

  fetchSaludData(): Observable<IData> {
    return this._http.get<IData>('json/data/salud.json');
  }

  fetchRemisesData(): Observable<IData> {
    return this._http.get<IData>('json/data/remises.json');
  }

  fetchPoliciasData(): Observable<IData> {
    return this._http.get<IData>('json/data/policia.json');
  }

  getData(): Observable<IData[]> {
    return forkJoin([this.fetchSaludData(), this.fetchRemisesData()]);
  }

  obtenerDatos(
    consulta: IConsulta | null,
    filtros: IFiltro[]
  ): Observable<IData> {
    const url = 'http://localhost:8001/consulta-completa';

    let params = new HttpParams();

    if (consulta) {
      Object.entries(consulta).forEach(([key, value]) => {
        params = params.append(key, value.toString());
      });
    } else {
      params = params.append('ciudad', 'miramar');
    }

    if (filtros) {
      filtros.forEach(filtro => {
        if (filtro.estado === 'aplicado') {
          params = params.append(filtro.key, filtro.appliedValue ?? '');
        }
      });
    }

    return this._http.get<IData>(url, { params });
  }
}
