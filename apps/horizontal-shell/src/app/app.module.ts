import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CatalogBasketComponent } from './catalog-basket/catalog-basket.component';
import { OrdersAccountComponent } from './orders-account/orders-account.component';
import { startsWith } from './router.utils';
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
    RouterModule.forRoot(
      [
        {
          matcher: startsWith('catalog-basket'),
          component: CatalogBasketComponent,
          pathMatch: 'full',
        },
        {
          matcher: startsWith('order-account'),
          component: OrdersAccountComponent,
          pathMatch: 'full',
        },
        { path: '', redirectTo: '/catalog-basket', pathMatch: 'full' },
      ],
      { relativeLinkResolution: 'legacy' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
