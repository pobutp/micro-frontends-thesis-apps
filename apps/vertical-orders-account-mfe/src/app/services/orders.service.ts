import { Injectable } from '@angular/core';
import { ConfigurationService, DataService, IOrder, IOrderItem, SecurityService } from '@micro-frontends-thesis-apps/shared';
import { Observable, tap } from 'rxjs';

import { IOrderDetail } from '../models/order-detail.model';
import { BasketService } from './basket.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersUrl = '';

  constructor(
    private service: DataService,
    private basketService: BasketService,
    private identityService: SecurityService,
    private configurationService: ConfigurationService
  ) {
    if (this.configurationService.isReady) this.ordersUrl = this.configurationService.serverSettings?.purchaseUrl ?? '';
    else
      this.configurationService.settingsLoaded$.subscribe(
        () => (this.ordersUrl = this.configurationService.serverSettings?.purchaseUrl ?? '')
      );
  }

  getOrders(): Observable<IOrder[]> {
    const url = this.ordersUrl + '/o/api/v1/orders';

    return this.service.get(url).pipe<IOrder[]>(
      tap((response: any) => {
        return response;
      })
    );
  }

  cancelOrder(orderNumber: number): Observable<any> {
    const url = this.ordersUrl + '/o/api/v1/orders/cancel';
    const data = { OrderNumber: orderNumber };

    return this.service.putWithId(url, data).pipe<any>(
      tap(() => {
        return;
      })
    );
  }

  getOrder(id: number): Observable<IOrderDetail> {
    const url = this.ordersUrl + '/o/api/v1/orders/' + id;

    return this.service.get(url).pipe<IOrderDetail>(
      tap((response: any) => {
        return response;
      })
    );
  }

  mapOrderAndIdentityInfoNewOrder(): IOrder {
    const order = <IOrder>{};
    const basket = this.basketService.basket;
    const identityInfo = this.identityService.userData;

    console.log(basket);
    console.log(identityInfo);

    // Identity data mapping:
    order.street = identityInfo.address_street;
    order.city = identityInfo.address_city;
    order.country = identityInfo.address_country;
    order.state = identityInfo.address_state;
    order.zipcode = identityInfo.address_zip_code;
    order.cardexpiration = identityInfo.card_expiration;
    order.cardnumber = identityInfo.card_number;
    order.cardsecuritynumber = identityInfo.card_security_number;
    order.cardtypeid = identityInfo.card_type;
    order.cardholdername = identityInfo.card_holder;
    order.total = 0;
    order.expiration = identityInfo.card_expiration;

    // basket data mapping:
    order.orderItems = new Array<IOrderItem>();
    basket.items.forEach((x: any) => {
      const item: IOrderItem = <IOrderItem>{};
      item.pictureurl = x.pictureUrl;
      item.productId = +x.productId;
      item.productname = x.productName;
      item.unitprice = x.unitPrice;
      item.units = x.quantity;

      order.total += item.unitprice * item.units;

      order.orderItems.push(item);
    });

    order.buyer = basket.buyerId;

    return order;
  }
}
