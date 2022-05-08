import { loadRemoteModule } from '@angular-architects/module-federation';

export interface Registy {
  [key: string]: () => Promise<any>;
}

export const registry: Registy = {
  verticalCatalogBasketMfe: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4211/remoteEntry.mjs',
      exposedModule: './web-components',
    }),
  verticalOrdersAccountMfe: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4212/remoteEntry.mjs',
      exposedModule: './web-components',
    }),
};
