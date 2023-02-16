import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrencyDataService } from './services/currency-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentJSON: any = [];

  firstCurrency: string = 'USD';
  secondCurrency: string = 'USD';
  result: string = '1';

  subscription: Subscription;

  setBaseCurrency(currency: string) {
    this.firstCurrency = currency;
  }

  setSecondCurrency(currency: string) {
    this.secondCurrency = currency;
  }

  constructor(public currencyDataSvc: CurrencyDataService) {}

  convert() {
    this.subscription = this.currencyDataSvc
      .getCurrencyData(this.firstCurrency)
      .subscribe((data) => {
        this.currentJSON = JSON.stringify(data);
        this.currentJSON = JSON.parse(this.currentJSON);

        if (this.secondCurrency === 'USD') {
          this.result = this.currentJSON.rates.USD;
        }
        if (this.secondCurrency === 'UAH') {
          this.result = this.currentJSON.rates.UAH.toFixed(2);
        }
        if (this.secondCurrency === 'EUR') {
          this.result = this.currentJSON.rates.EUR.toFixed(2);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
