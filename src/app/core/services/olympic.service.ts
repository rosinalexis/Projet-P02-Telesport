import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  private olympicList: Olympic[] = [];

  constructor(private http: HttpClient) { }

  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe();
  }

  getOlympicByCountryName(countryName: string) {
    const olympic: Olympic | undefined = this.olympicList.find(olympic => olympic.country === countryName);
    return olympic;
  }

}
