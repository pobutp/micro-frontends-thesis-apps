import { Injectable } from '@angular/core';
import { ConfigurationService, DataService, IBasket } from '@micro-frontends-thesis-apps/shared';
import { Observable, Subject, tap } from 'rxjs';

import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketUrl = '';
  private purchaseUrl = '';

  basket: IBasket = {
    buyerId: '',
    items: [],
  };

  //observable that is fired when item is removed from basket
  private basketUpdateSource = new Subject<void>();
  basketUpdate$ = this.basketUpdateSource.asObservable();

  constructor(
    private readonly service: DataService,
    private readonly authService: SecurityService,
    private readonly configurationService: ConfigurationService
  ) {
    this.basket.items = [];

    // Init:
    if (this.authService.isAuthorized) {
      if (this.authService.userData) {
        this.basket.buyerId = this.authService.userData['sub'];
        if (this.configurationService.isReady && this.configurationService && this.configurationService.serverSettings) {
          this.basketUrl = this.configurationService.serverSettings.purchaseUrl;
          this.purchaseUrl = this.configurationService.serverSettings.purchaseUrl;
          this.loadData();
        } else {
          this.configurationService.settingsLoaded$.subscribe(() => {
            this.basketUrl = this.configurationService.serverSettings?.purchaseUrl ?? '';
            this.purchaseUrl = this.configurationService.serverSettings?.purchaseUrl ?? '';
            this.loadData();
          });
        }
      }
    }
  }

  addItemToBasket(item: any): Observable<boolean> {
    const basketItem = this.basket.items.find((value) => value.productId == item.productId);

    if (basketItem) {
      basketItem.quantity++;
    } else {
      this.basket.items.push(item);
    }

    return this.setBasket(this.basket);
  }

  setBasket(basket: any): Observable<boolean> {
    const url = this.purchaseUrl + '/b/api/v1/basket/';

    this.basket = basket;

    return this.service.post(url, basket).pipe<boolean>(tap((response: any) => true));
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

  updateQuantity() {
    this.basketUpdateSource.next();
  }

  dropBasket() {
    this.basket.items = [];
    this.setBasket(this.basket).subscribe((res) => {
      this.basketUpdateSource.next();
    });
  }

  private loadData() {
    this.getBasket().subscribe((basket) => {
      if (basket != null) this.basket.items = basket.items;
    });
  }
}
