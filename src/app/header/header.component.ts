import { Component } from '@angular/core';
import { CurrencyDataService } from '../services/currency-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  usd: Observable<string> = this.getCurrencyValue('USD');
  eur: Observable<string> = this.getCurrencyValue('EUR');

  constructor(public currencyDataSvc: CurrencyDataService) {}

  getCurrencyValue(currency: string): Observable<string> {
    return this.currencyDataSvc.getCurrencyData(currency).pipe(
      map((data) => {
        return data.rates['UAH'].toFixed(2);
      })
    );
  }
}
