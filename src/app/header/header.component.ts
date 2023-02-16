import { Component } from '@angular/core';
import { CurrencyDataService } from '../services/currency-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentJSON: any = [];
  usd: Subscription = this.getCurrencyValue('USD');
  eur: Subscription = this.getCurrencyValue('EUR');

  constructor(public currencyDataSvc: CurrencyDataService) {}

  getCurrencyValue(currency: string): Subscription {
    return this.currencyDataSvc.getCurrencyData(currency).subscribe((data) => {
      this.currentJSON = JSON.stringify(data);
      this.currentJSON = JSON.parse(this.currentJSON);

      if (currency === 'USD') {
        this.usd = this.currentJSON.rates.UAH.toFixed(2);
      }
      if (currency === 'EUR') {
        this.eur = this.currentJSON.rates.UAH.toFixed(2);
      }
    });
  }

  ngOnDestroy(): void {
    this.usd.unsubscribe();
    this.eur.unsubscribe();
  }
}
