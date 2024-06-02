import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympic } from '../models/Olympic';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl: string = environment.apiOlympicUrl;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the Olympic Games data from the server.
   *
   * @returns An observable that emits an array of `Olympic` objects.
   */
  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe() ?? [];
  }

  /**
   * Retrieves the Olympic data for a specific country by its ID from the server.
   *
   * @param countryID - The ID of the country for which the Olympic data is being requested.
   * @returns An observable that emits the `Olympic` object for the specified country.
   */
  getOlympicByCountryById(countryID: number): Observable<Olympic> {
    return this.http.get<Olympic>(`${this.olympicUrl}${countryID}`) ?? null;
  }
}
