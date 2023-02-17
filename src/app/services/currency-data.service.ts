import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyResp } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyDataService {
  constructor(public http: HttpClient) {}

  getCurrencyData(currency: string): Observable<CurrencyResp> {
    let urlBase = 'https://api.exchangerate.host';
    let url = urlBase + `/latest?base=${currency}`;

    return this.http.get(url) as Observable<CurrencyResp>;
  }
}
