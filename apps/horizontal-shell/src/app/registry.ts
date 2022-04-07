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
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './web-components',
    }),
  // horizontalOrdersMfe: () =>
  //   loadRemoteModule({
  //     type: 'module',
  //     remoteEntry: 'http://localhost:4203/remoteEntry.js',
  //     exposedModule: './web-components',
  //   }),
  horizontalAccountMfe: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      exposedModule: './web-components',
    }),
};
