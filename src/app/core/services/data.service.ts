import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { IData } from '../interfaces/i-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private _http: HttpClient) {}

  fetchSaludData(): Observable<IData> {
    return this._http.get<IData>('json/data/salud.json');
  }

  fetchRemisesData(): Observable<IData> {
    return this._http.get<IData>('json/data/remises.json');
  }

  getData(): Observable<IData[]> {
    return forkJoin(
      [
        this.fetchSaludData(),
        this.fetchRemisesData()
      ]
    );
  }


}
