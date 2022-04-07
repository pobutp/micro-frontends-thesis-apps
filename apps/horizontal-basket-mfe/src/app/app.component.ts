import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IBasketItem } from './models/basket-item.model';
import { IBasket } from './models/basket.model';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'micro-frontends-thesis-apps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  errorMessages: any;
  basket: IBasket | undefined;
  totalPrice = 0;

  constructor(private basketSerive: BasketService) {}
  //private router: Router
  //private basketWrapperService: BasketWrapperService

  ngOnInit() {
    this.basketSerive.getBasket().subscribe((basket) => {
      this.basket = basket;
      this.calculateTotalPrice();
    });
  }

  deleteItem(id: string): void {
    if (!this.basket) {
      return;
    }

    this.basket.items = this.basket.items.filter((item: { id: string }) => item.id !== id);
    this.calculateTotalPrice();

    this.basketSerive.setBasket(this.basket).subscribe((x) => {
      this.basketSerive.updateQuantity();
      console.log('basket updated: ' + x);
    });
  }

  itemQuantityChanged(item: IBasketItem, quantity: number) {
    item.quantity = quantity > 0 ? quantity : 1;
    this.calculateTotalPrice();
    this.basketSerive.setBasket(this.basket).subscribe((x) => console.log('basket updated: ' + x));
  }

  update(event: any): Observable<boolean> {
    const setBasketObservable = this.basketSerive.setBasket(this.basket);
    setBasketObservable.subscribe(
      (x) => {
        this.errorMessages = [];
        console.log('basket updated: ' + x);
      },
      (errMessage) => (this.errorMessages = errMessage.messages)
    );
    return setBasketObservable;
  }

  checkOut(event: any) {
    this.update(event).subscribe((x) => {
      this.errorMessages = [];
      //this.basketWrapperService.basket = this.basket;
      //this.router.navigate(['order']);
      console.log('checkOut');
    });
  }

  private calculateTotalPrice(): void {
    if (!this.basket) {
      return;
    }

    this.totalPrice = 0;
    this.basket.items.forEach((item: any) => {
      this.totalPrice += item.unitPrice * item.quantity;
    });
  }
}
