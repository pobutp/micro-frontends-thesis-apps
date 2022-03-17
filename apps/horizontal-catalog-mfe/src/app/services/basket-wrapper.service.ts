import { Injectable } from '@angular/core';

import { ICatalogItem } from '../models/catalog-item.model';

@Injectable({
  providedIn: 'root',
})
export class BasketWrapperService {
  addItemToBasket(item: ICatalogItem) {
    throw new Error('Method not implemented.');
  }
}
