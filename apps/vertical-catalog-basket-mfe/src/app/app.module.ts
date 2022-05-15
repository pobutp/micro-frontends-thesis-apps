/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasketContainerComponent } from './components/basket-container/basket-container.component';
import { CatalogContainerComponent } from './components/catalog-container/catalog-container.component';
import { PagerComponent } from './components/pager/pager.component';

@NgModule({
  declarations: [AppComponent, CatalogContainerComponent, BasketContainerComponent, PagerComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('vertical-catalog-basket-mfe', ce);
  }
}
