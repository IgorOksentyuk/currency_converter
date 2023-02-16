import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyDataService {
  currentJSON: any = [];

  constructor(public http: HttpClient) {}

  getCurrencyData(currency: string) {
    let url = `https://api.exchangerate.host/latest?base=${currency}`;
    return this.http.get(url);
  }
}
