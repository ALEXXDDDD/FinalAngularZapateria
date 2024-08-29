import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {
  pay(amount: number){
    console.log(`Paying ${amount} using Stripe`);
  }
}
