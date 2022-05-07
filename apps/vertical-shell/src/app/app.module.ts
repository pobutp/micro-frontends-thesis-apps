import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'catalog-basket',
          loadChildren: () => import('vertical-catalog-basket-mfe/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'orders-account',
          loadChildren: () => import('vertical-orders-account-mfe/Module').then((m) => m.RemoteEntryModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
