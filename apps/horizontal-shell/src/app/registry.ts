import { loadRemoteModule } from '@angular-architects/module-federation';

export interface Registy {
  [key: string]: () => Promise<any>;
}

export const registry: Registy = {
  horizontalCatalogMfe: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './web-components',
    }),
  horizontalBasketMfe: () =>
    loadRemoteModule({
      type: 'script',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      remoteName: 'horizontalBasketMfe',
      exposedModule: './web-components',
    }),
  horizontalOrdersMfe: () =>
    loadRemoteModule({
      type: 'script',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      remoteName: 'horizontalOrdersMfe',
      exposedModule: './web-components',
    }),
  horizontalAccountMfe: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      exposedModule: './web-components',
    }),
};
