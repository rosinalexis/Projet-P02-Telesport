import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympic } from '../models/Olympic';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = environment.apiOlympicUrl;

  constructor(private http: HttpClient) { }

  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe() ?? [];
  }

  getOlympicByCountryById(countryID: number): Observable<Olympic> {
    return this.http.get<Olympic>(`${this.olympicUrl}${countryID}`) ?? null;
  }

}
