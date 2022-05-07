import { Component, OnInit } from '@angular/core';
import {
  CatalogMfeEvents,
  CustomEventConfig,
  EventDispatcherService,
  GlobalCustomEvents,
  IBasket,
  IBasketItem,
  SecurityService,
} from '@micro-frontends-thesis-apps/shared';
import { Observable } from 'rxjs';

import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'hb-basket-container',
  templateUrl: './basket-container.component.html',
  styleUrls: ['./basket-container.component.scss'],
})
export class BasketContainerComponent implements OnInit {
  errorMessages: any;
  basket: IBasket | undefined;
  totalPrice = 0;
  isAuthorized = this.authService.isAuthorized;

  constructor(
    private readonly authService: SecurityService,
    private readonly basketService: BasketService,
    private readonly eventDispatcherService: EventDispatcherService
  ) {}

  ngOnInit() {
    this.basketService.getBasket().subscribe((basket) => {
      this.basket = basket;
      this.calculateTotalPrice();
    });

    this.eventDispatcherService.on(CatalogMfeEvents.ADD_PRODUCT_TO_BASKET).subscribe((event) => {
      this.basketService.addItemToBasket(event.detail).subscribe((res) => {
        this.basketService.getBasket().subscribe((basket) => {
          console.log('[Basket] event', event);
          if (basket) {
            console.log('[Basket] basket', basket);
            this.basket = basket;
            this.calculateTotalPrice();
          }
        });
      });
    });
  }

  deleteItem(id: string): void {
    if (!this.basket) {
      return;
    }

    this.basket.items = this.basket.items.filter((item: { id: string }) => item.id !== id);
    this.calculateTotalPrice();

    this.basketService.setBasket(this.basket).subscribe((x) => {
      this.basketService.updateQuantity();
      console.log('basket updated: ' + x);
    });
  }

  itemQuantityChanged(item: IBasketItem, quantity: number) {
    item.quantity = quantity > 0 ? quantity : 1;
    this.calculateTotalPrice();
    this.basketService.setBasket(this.basket).subscribe((x) => console.log('basket updated: ' + x));
  }

  update(event: any): Observable<boolean> {
    const setBasketObservable = this.basketService.setBasket(this.basket);
    setBasketObservable.subscribe(
      (x) => {
        this.errorMessages = [];
        console.log('basket updated: ' + x);
      },
      (errMessage) => (this.errorMessages = errMessage.messages)
    );
    return setBasketObservable;
  }

  checkOut(event: any): void {
    this.update(event).subscribe((x) => {
      this.errorMessages = [];
      this.navigateToNewOrder();
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

  private navigateToNewOrder(): void {
    const config: CustomEventConfig = {
      detail: {
        url: '/orders-account/order',
      },
    };
    this.eventDispatcherService.dispatchEvent(GlobalCustomEvents.NAVIGATE, config);
  }
}
