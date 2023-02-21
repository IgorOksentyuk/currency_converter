import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrencyDataService } from './services/currency-data.service';
import { CurrencyForm } from './models/currency-form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  firstCurrency = 'USD';
  secondCurrency = 'USD';
  result = 1;
  currencies: string[] = [];
  subscription: Subscription;
  currencyValue: number;

  constructor(
    public currencyDataSvc: CurrencyDataService,
    private cdref: ChangeDetectorRef
  ) {}

  form: CurrencyForm = {
    count: 1,
  };

  ngOnInit(): void {
    this.currencies = ['USD', 'UAH', 'EUR'];
    this.cdref.detectChanges();
    this.getCurrencyValue();
  }

  setBaseCurrency(currency: string) {
    this.firstCurrency = currency;
    this.getCurrencyValue();
  }

  setSecondCurrency(currency: string) {
    this.secondCurrency = currency;
    this.getCurrencyValue();
  }

  getCurrencyValue() {
    this.subscription = this.currencyDataSvc
      .getCurrencyData(this.firstCurrency)
      .subscribe((data) => {
        this.currencyValue = data.rates[this.secondCurrency];
      });
  }

  getnputValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.form.count = Number(target.value);
  }

  showResult() {
    this.result = this.form.count * this.currencyValue;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
