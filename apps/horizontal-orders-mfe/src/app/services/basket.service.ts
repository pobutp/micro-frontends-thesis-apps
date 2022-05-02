import { Injectable } from '@angular/core';
import { ConfigurationService, DataService, IBasket, IOrder, SecurityService } from '@micro-frontends-thesis-apps/shared';
import { Observable, tap } from 'rxjs';

import { IBasketCheckout } from '../models/basket-checkout.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketUrl = '';

  basket: IBasket = {
    buyerId: '',
    items: [],
  };

  constructor(private service: DataService, private authService: SecurityService, private configurationService: ConfigurationService) {
    this.basket.items = [];

    // Init:
    if (this.authService.isAuthorized) {
      if (this.authService.userData) {
        this.basket.buyerId = this.authService.userData['sub'];
        if (this.configurationService.isReady && this.configurationService && this.configurationService.serverSettings) {
          this.basketUrl = this.configurationService.serverSettings.purchaseUrl;
          this.loadData();
        } else {
          this.configurationService.settingsLoaded$.subscribe(() => {
            this.basketUrl = this.configurationService.serverSettings?.purchaseUrl ?? '';
            this.loadData();
          });
        }
      }
    }
  }

  getBasket(): Observable<IBasket> {
    const url = this.basketUrl + '/b/api/v1/basket/' + this.basket.buyerId;

    return this.service.get(url).pipe<IBasket>(
      tap((response: any) => {
        if (response.status === 204) {
          return null;
        }

        return response;
      })
    );
  }

  mapBasketInfoCheckout(order: IOrder): IBasketCheckout {
    const basketCheckout = <IBasketCheckout>{};

    basketCheckout.street = order.street;
    basketCheckout.city = order.city;
    basketCheckout.country = order.country;
    basketCheckout.state = order.state;
    basketCheckout.zipcode = order.zipcode;
    basketCheckout.cardexpiration = order.cardexpiration;
    basketCheckout.cardnumber = order.cardnumber;
    basketCheckout.cardsecuritynumber = order.cardsecuritynumber;
    basketCheckout.cardtypeid = order.cardtypeid;
    basketCheckout.cardholdername = order.cardholdername;
    basketCheckout.total = 0;
    basketCheckout.expiration = order.expiration;

    return basketCheckout;
  }

  setBasketCheckout(basketCheckout: any): Observable<boolean> {
    const url = this.basketUrl + '/b/api/v1/basket/checkout';

    return this.service.postWithId(url, basketCheckout).pipe<boolean>(
      tap((response: any) => {
        return true;
      })
    );
  }

  private loadData() {
    this.getBasket().subscribe((basket) => {
      console.log('loadData basket', basket);
      if (basket != null) this.basket.items = basket.items;
    });
  }
}
