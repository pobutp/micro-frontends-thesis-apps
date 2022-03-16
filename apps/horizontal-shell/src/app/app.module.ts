import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CatalogBasketComponent } from './catalog-basket/catalog-basket.component';
import { OrdersAccountComponent } from './orders-account/orders-account.component';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    OrdersAccountComponent,
    CatalogBasketComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'catalog-basket',
        component: CatalogBasketComponent,
        pathMatch: 'full',
      },
      {
        path: 'order-account',
        component: OrdersAccountComponent,
        pathMatch: 'full',
      },
      { path: '', redirectTo: '/catalog-basket', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
