import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

import { IBasketCheckout } from '../models/basket-checkout.model';
import { IBasket } from '../models/basket.model';
import { IOrder } from '../models/order.model';
import { ConfigurationService } from './configuration.service';
import { DataService } from './data.service';
import { SecurityService } from './security.service';
import { StorageService } from './storage.service';

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
    private service: DataService,
    private authService: SecurityService,
    //private basketWrapperService: BasketWrapperService, -> event emitted from pub/sub in shell
    //private router: Router,
    private configurationService: ConfigurationService,
    private storageService: StorageService
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

    // this.basketWrapperService.orderCreated$.subscribe((x) => {
    //   this.dropBasket();
    // });
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

  setBasketCheckout(basketCheckout: any): Observable<boolean> {
    const url = this.basketUrl + '/b/api/v1/basket/checkout';

    return this.service.postWithId(url, basketCheckout).pipe<boolean>(
      tap((response: any) => {
        //this.basketWrapperService.orderCreated();
        return true;
      })
    );
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
