import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { startsWith } from '@micro-frontends-thesis-apps/shared';

import { AppComponent } from './app.component';
import { CatalogBasketComponent } from './components/catalog-basket/catalog-basket.component';
import { IdentityComponent } from './components/identity/identity.component';
import { OrdersAccountComponent } from './components/orders-account/orders-account.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';

@NgModule({
  declarations: [AppComponent, WrapperComponent, OrdersAccountComponent, CatalogBasketComponent, IdentityComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          matcher: startsWith('catalog-basket'),
          component: CatalogBasketComponent,
        },
        {
          matcher: startsWith('orders-account'),
          component: OrdersAccountComponent,
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
