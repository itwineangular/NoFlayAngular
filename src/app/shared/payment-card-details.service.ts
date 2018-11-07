import { Injectable } from '@angular/core';
import { PaymentCard } from "./paymentCardObject";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentCardDetailsService {


  paymentCard: PaymentCard = new PaymentCard();

  constructor() { }

  addCardDetails(cardNumber: any, expiryDate: any, cvvNumber: any): void {
    this.paymentCard.cardNumber = cardNumber;
    this.paymentCard.expiryDate = expiryDate;
    this.paymentCard.cvvNumber = cvvNumber;
  }

  getCardDetails(): Observable<PaymentCard> {
    return of(this.paymentCard);
  }
}
