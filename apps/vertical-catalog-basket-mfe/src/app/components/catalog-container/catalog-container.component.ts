import { Component, OnInit } from '@angular/core';
import { SecurityService } from '@micro-frontends-thesis-apps/shared';
import { catchError, Observable, Subscription, throwError } from 'rxjs';

import { ICatalogBrand } from '../../models/catalog-brand.model';
import { ICatalogItem } from '../../models/catalog-item.model';
import { ICatalogType } from '../../models/catalog-type.model';
import { ICatalog } from '../../models/catalog.model';
import { IPager } from '../../models/pager.model';
import { BasketWrapperService } from '../../services/basket-wrapper.service';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'vcb-catalog-container',
  templateUrl: './catalog-container.component.html',
  styleUrls: ['./catalog-container.component.scss'],
})
export class CatalogContainerComponent implements OnInit {
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
    this.authenticated = !!securityService.isAuthorized;
  }

  ngOnInit(): void {
    this.configurationService.init();

    // Configuration Settings:
    if (this.configurationService.isReady) this.loadData();
    else
      this.configurationService.settingsLoaded$.subscribe((x) => {
        this.loadData();
      });

    // Subscribe to login and logout observable
    this.authSubscription = this.securityService.authenticationChallenge$.subscribe((res) => {
      this.authenticated = res;
    });
  }

  loadData(): void {
    this.getBrands();
    this.getCatalog(12, 0);
    this.getTypes();
  }

  onFilterApplied(event: any): void {
    event.preventDefault();

    if (this.brandSelected) {
      this.brandSelected = this.brandSelected && this.brandSelected.toString() != 'null' ? this.brandSelected : null;
    }
    this.typeSelected = this.typeSelected && this.typeSelected.toString() != 'null' ? this.typeSelected : null;

    if (this.paginationInfo) {
      this.paginationInfo.actualPage = 0;
      this.getCatalog(this.paginationInfo.itemsPage, this.paginationInfo.actualPage, this.brandSelected, this.typeSelected);
    }
  }

  onBrandFilterChanged(event: any): void {
    event.preventDefault();
    const value = +(event.target as HTMLInputElement).value;
    this.brandSelected = value;
  }

  onTypeFilterChanged(event: any): void {
    event.preventDefault();
    const value = +(event.target as HTMLInputElement).value;
    this.typeSelected = value;
  }

  onPageChanged(value: any): void {
    console.log('catalog pager event fired' + value);
    if (this.paginationInfo) {
      this.paginationInfo.actualPage = value;
      this.getCatalog(this.paginationInfo.itemsPage, value);
    }
  }

  addToCart(item: ICatalogItem): void {
    if (!this.authenticated) {
      return;
    }
    this.basketService.addItemToBasket(item);
  }

  getCatalog(pageSize: number, pageIndex: number, brand?: number, type?: number): void {
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

  getTypes(): void {
    this.service.getTypes().subscribe((types) => {
      this.types = types;
      const alltypes = { id: null, type: 'All' };
      this.types.unshift(alltypes);
    });
  }

  getBrands(): void {
    this.service.getBrands().subscribe((brands) => {
      this.brands = brands;
      const allBrands = { id: null, brand: 'All' };
      this.brands.unshift(allBrands);
    });
  }

  private handleError(error: any): Observable<never> {
    this.errorReceived = true;
    return throwError(() => error);
  }
}
