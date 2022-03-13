import React from 'react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

class HorizntalBasketMfeElement extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
      this
    );
  }
}

customElements.define('horizontal-basket-mfe', HorizntalBasketMfeElement);
