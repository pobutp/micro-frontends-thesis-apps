import { Injectable } from '@angular/core';
import { DataService } from '@micro-frontends-thesis-apps/shared';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { ICatalogBrand } from '../models/catalog-brand.model';
import { ICatalogType } from '../models/catalog-type.model';
import { ICatalog } from '../models/catalog.model';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private catalogUrl = '';
  private brandUrl = '';
  private typesUrl = '';

  constructor(private service: DataService, private configurationService: ConfigurationService) {
    console.log('[CATALOG] configurationService', this.configurationService.serverSettings);
    this.configurationService.settingsLoaded$.subscribe(() => {
      this.catalogUrl = this.configurationService.serverSettings?.purchaseUrl + '/c/api/v1/catalog/items';
      this.brandUrl = this.configurationService.serverSettings?.purchaseUrl + '/c/api/v1/catalog/catalogbrands';
      this.typesUrl = this.configurationService.serverSettings?.purchaseUrl + '/c/api/v1/catalog/catalogtypes';
    });
  }

  getCatalog(pageIndex: number, pageSize: number, brand: number, type: number): Observable<ICatalog> {
    let url = this.catalogUrl;

    if (type) {
      url = this.catalogUrl + '/type/' + type.toString() + '/brand/' + (brand ? brand.toString() : '');
    } else if (brand) {
      url = this.catalogUrl + '/type/all' + '/brand/' + (brand ? brand.toString() : '');
    }

    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    console.log('getCatalog', url);
    return this.service.get(url).pipe<ICatalog>(
      tap((response: any) => {
        return response;
      })
    );
  }

  getBrands(): Observable<ICatalogBrand[]> {
    return this.service.get(this.brandUrl).pipe<ICatalogBrand[]>(
      tap((response: any) => {
        return response;
      })
    );
  }

  getTypes(): Observable<ICatalogType[]> {
    return this.service.get(this.typesUrl).pipe<ICatalogType[]>(
      tap((response: any) => {
        return response;
      })
    );
  }
}
