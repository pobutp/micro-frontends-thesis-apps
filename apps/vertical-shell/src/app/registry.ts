import { loadRemoteModule } from '@angular-architects/module-federation';

export interface Registy {
  [key: string]: () => Promise<any>;
}

export const registry: Registy = {
  horizontalCatalogBasketMfe: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './web-components',
    }),
  horizontalOrdersAccountMfe: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './web-components',
    }),
};
