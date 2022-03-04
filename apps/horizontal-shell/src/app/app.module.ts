import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('horizontal-catalog-mfe/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        // {
        //   path: 'horizontal-basket-mfe',
        //   loadChildren: () =>
        //     import('horizontal-basket-mfe/Module').then(
        //       (m) => m.RemoteEntryModule
        //     ),
        // },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
