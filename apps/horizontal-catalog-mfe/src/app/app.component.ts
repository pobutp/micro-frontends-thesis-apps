import { Component, OnInit } from '@angular/core';
import { catchError, Subscription, throwError } from 'rxjs';

import { ICatalogBrand } from './models/catalog-brand.model';
import { ICatalogItem } from './models/catalog-item.model';
import { ICatalogType } from './models/catalog-type.model';
import { ICatalog } from './models/catalog.model';
import { IPager } from './models/pager.model';
import { BasketWrapperService } from './services/basket-wrapper.service';
import { CatalogService } from './services/catalog.service';
import { ConfigurationService } from './services/configuration.service';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'hc-mfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  brands: ICatalogBrand[] | undefined;
  types: ICatalogType[] | undefined;
  catalog: ICatalog | undefined;
  brandSelected: number | null = null;
  typeSelected: number | null = null;
  paginationInfo: IPager | undefined;
  authenticated = false;
  authSubscription: Subscription | undefined;
  errorReceived: boolean | undefined;

  constructor(
    private service: CatalogService,
    private basketService: BasketWrapperService,
    private configurationService: ConfigurationService,
    private securityService: SecurityService
  ) {
    this.authenticated = !!securityService.IsAuthorized;
  }

  ngOnInit() {
    this.configurationService.load();

    // Configuration Settings:
    if (this.configurationService.isReady) this.loadData();
    else
      this.configurationService.settingsLoaded$.subscribe((x) => {
        this.loadData();
      });

    // Subscribe to login and logout observable
    this.authSubscription =
      this.securityService.authenticationChallenge$.subscribe((res) => {
        this.authenticated = res;
      });
  }

  loadData() {
    this.getBrands();
    this.getCatalog(12, 0);
    this.getTypes();
  }

  onFilterApplied(event: any) {
    event.preventDefault();

    if (this.brandSelected) {
      this.brandSelected =
        this.brandSelected && this.brandSelected.toString() != 'null'
          ? this.brandSelected
          : null;
    }
    this.typeSelected =
      this.typeSelected && this.typeSelected.toString() != 'null'
        ? this.typeSelected
        : null;

    if (this.paginationInfo) {
      this.paginationInfo.actualPage = 0;
      this.getCatalog(
        this.paginationInfo.itemsPage,
        this.paginationInfo.actualPage,
        this.brandSelected,
        this.typeSelected
      );
    }
  }

  onBrandFilterChanged(event: any) {
    event.preventDefault();
    const value = +(event.target as HTMLInputElement).value;
    this.brandSelected = value;
  }

  onTypeFilterChanged(event: any) {
    event.preventDefault();
    const value = +(event.target as HTMLInputElement).value;
    this.typeSelected = value;
  }

  onPageChanged(value: any) {
    console.log('catalog pager event fired' + value);
    //event.preventDefault();
    if (this.paginationInfo) {
      this.paginationInfo.actualPage = value;
      this.getCatalog(this.paginationInfo.itemsPage, value);
    }
  }

  addToCart(item: ICatalogItem) {
    if (!this.authenticated) {
      return;
    }
    this.basketService.addItemToBasket(item);
  }

  getCatalog(
    pageSize: number,
    pageIndex: number,
    brand?: number,
    type?: number
  ) {
    this.errorReceived = false;
    this.service
      .getCatalog(pageIndex, pageSize, brand, type)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe((catalog: ICatalog) => {
        this.catalog = catalog;
        this.paginationInfo = {
          actualPage: catalog.pageIndex,
          itemsPage: catalog.pageSize,
          totalItems: catalog.count,
          totalPages: Math.ceil(catalog.count / catalog.pageSize),
          items: catalog.pageSize,
        };
      });
  }

  getTypes() {
    this.service.getTypes().subscribe((types) => {
      this.types = types;
      const alltypes = { id: null, type: 'All' };
      this.types.unshift(alltypes);
    });
  }

  getBrands() {
    this.service.getBrands().subscribe((brands) => {
      this.brands = brands;
      const allBrands = { id: null, brand: 'All' };
      this.brands.unshift(allBrands);
    });
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return throwError(() => error);
  }
}
