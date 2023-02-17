import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrencyDataService } from './services/currency-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  firstCurrency = 'USD';
  secondCurrency = 'USD';
  result = '1.00';
  currencies: string[] = [];
  subscription: Subscription;

  constructor(
    public currencyDataSvc: CurrencyDataService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currencies = ['USD', 'UAH', 'EUR'];
    this.cdref.detectChanges();
  }

  setBaseCurrency(currency: string) {
    this.firstCurrency = currency;
  }

  setSecondCurrency(currency: string) {
    this.secondCurrency = currency;
  }

  convert() {
    this.subscription = this.currencyDataSvc
      .getCurrencyData(this.firstCurrency)
      .subscribe((data) => {
        this.result = data.rates[this.secondCurrency].toFixed(2);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
