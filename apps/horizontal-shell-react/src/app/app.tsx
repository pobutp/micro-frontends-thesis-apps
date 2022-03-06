// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Basket = React.lazy(() => import('HorizontalBasketMfe/RemoteEntry'));

const renderMFE = (MFE: any) => {
  return (
    <React.Suspense fallback="Loading...">
      <MFE />
    </React.Suspense>
  );
};

export function App() {
  return (
    <>
      <h1>horizontal-shell-react</h1>
      <div />

      <Switch>
        <Route path="/" render={(_) => renderMFE(Basket)} />
      </Switch>
    </>
  );
}

export default App;
