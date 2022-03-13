import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [AppComponent, WrapperComponent, CatalogComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: 'catalog', component: CatalogComponent, pathMatch: 'full' },
        { path: '', redirectTo: '/catalog', pathMatch: 'full' },
        // {
        //   matcher: startsWith('horizontalCatalogMfe'),
        //   component: WrapperComponent,
        //   data: {
        //     importName: 'horizontalCatalogMfe',
        //     elementName: 'horizontal-catalog-mfe',
        //   },
        // },
        // {
        //   matcher: startsWith('horizontalBasketMfe'),
        //   component: WrapperComponent,
        //   data: {
        //     importName: 'horizontalBasketMfe',
        //     elementName: 'horizontal-basket-mfe',
        //   },
        // },
      ]
      //{ relativeLinkResolution: 'legacy' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
