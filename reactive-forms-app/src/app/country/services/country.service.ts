import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  private baseUrl = 'https://restcountries.com/v3.1';

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  getRegions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    if (!alphaCode) return of(null);
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountriesBorderByCodes(borders: string[]): Observable<Country[]> {
    if (!borders) return of([]);
    const url = `${this.baseUrl}/alpha?codes=${borders.join(',')}&fields=cca3,name`;
    return this.http.get<Country[]>(url);
  }
}
