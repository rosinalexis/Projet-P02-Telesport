import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = 'http://localhost:3000/olympics/';

  constructor(private http: HttpClient) { }

  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe() ?? [];
  }

  getOlympicByCountryById(countryID: number): Observable<Olympic> {
    return this.http.get<Olympic>(`${this.olympicUrl}${countryID}`) ?? null;
  }

}
