/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderNewComponent } from './components/order-new/order-new.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [AppComponent, OrdersComponent, OrderNewComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'order-account/orders',
          component: OrdersComponent,
        },
        {
          path: 'order-account/orders/:id',
          component: OrderDetailsComponent,
        },
        {
          path: 'order-account/order',
          component: OrderNewComponent,
        },
        { path: '**', component: OrdersComponent },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('horizontal-orders-mfe', ce);
  }
}
