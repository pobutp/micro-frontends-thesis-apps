import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomEventConfig, EventDispatcherService, GlobalCustomEvents, IOrder } from '@micro-frontends-thesis-apps/shared';
import { catchError, throwError } from 'rxjs';

import { BasketService } from '../../services/basket.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'voa-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.scss'],
})
export class OrderNewComponent implements OnInit {
  newOrderForm: FormGroup | undefined; // new order form
  isOrderProcessing = false;
  errorReceived = false;
  order: IOrder = <IOrder>{};

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly orderService: OrdersService,
    private readonly basketService: BasketService,
    private readonly eventDispatcherService: EventDispatcherService
  ) {}

  ngOnInit(): void {
    this.basketService.getBasket().subscribe(() => {
      this.setupOrderForm();
    });
  }

  submitForm(value: any): void {
    if (!this.newOrderForm) {
      return;
    }

    this.order.street = this.newOrderForm.controls['street'].value;
    this.order.city = this.newOrderForm.controls['city'].value;
    this.order.state = this.newOrderForm.controls['state'].value;
    this.order.country = this.newOrderForm.controls['country'].value;
    this.order.cardnumber = this.newOrderForm.controls['cardnumber'].value;
    this.order.cardtypeid = 1;
    this.order.cardholdername = this.newOrderForm.controls['cardholdername'].value;
    this.order.cardexpiration = new Date(
      20 + this.newOrderForm.controls['expirationdate'].value.split('/')[1],
      this.newOrderForm.controls['expirationdate'].value.split('/')[0]
    );
    this.order.cardsecuritynumber = this.newOrderForm.controls['securitycode'].value;
    const basketCheckout = this.basketService.mapBasketInfoCheckout(this.order);
    this.basketService
      .setBasketCheckout(basketCheckout)
      .pipe(
        catchError((errMessage) => {
          this.errorReceived = true;
          this.isOrderProcessing = false;
          return throwError(() => errMessage);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/orders-account/orders']);
      });
    this.errorReceived = false;
    this.isOrderProcessing = true;
  }

  navigateToBasket(): void {
    const config: CustomEventConfig = {
      detail: {
        url: '/',
      },
    };
    this.eventDispatcherService.dispatchEvent(GlobalCustomEvents.NAVIGATE, config);
  }

  private setupOrderForm(): void {
    // Obtain user profile information
    this.order = this.orderService.mapOrderAndIdentityInfoNewOrder();
    this.newOrderForm = this.fb.group({
      street: [this.order.street, Validators.required],
      city: [this.order.city, Validators.required],
      state: [this.order.state, Validators.required],
      country: [this.order.country, Validators.required],
      cardnumber: [this.order.cardnumber, Validators.required],
      cardholdername: [this.order.cardholdername, Validators.required],
      expirationdate: [this.order.expiration, Validators.required],
      securitycode: [this.order.cardsecuritynumber, Validators.required],
    });
  }
}
