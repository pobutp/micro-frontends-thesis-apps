import { Injectable } from '@angular/core';
import {
  CatalogMfeEvents,
  EventDispatcherService,
  Guid,
  IBasketItem,
  SecurityService,
} from '@micro-frontends-thesis-apps/shared';

import { ICatalogItem } from '../models/catalog-item.model';

@Injectable({
  providedIn: 'root',
})
export class BasketWrapperService {
  constructor(private readonly eventDispatcherService: EventDispatcherService, private readonly securityService: SecurityService) {}

  addItemToBasket(item: ICatalogItem): void {
    if (this.securityService.isAuthorized) {
      const basketItem: IBasketItem = {
        pictureUrl: item.pictureUri,
        productId: item.id,
        productName: item.name,
        quantity: 1,
        unitPrice: item.price,
        id: Guid.newGuid(),
        oldUnitPrice: 0,
      };

      //this.addItemToBasketSource.next(basketItem);
      this.eventDispatcherService.dispatchEvent(CatalogMfeEvents.ADD_PRODUCT_TO_BASKET, { detail: basketItem });
    } else {
      this.securityService.Authorize();
    }
  }
}
