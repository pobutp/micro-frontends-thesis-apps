import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

class HorizntalOrdersMfeElement extends HTMLElement {
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

customElements.define('horizontal-orders-mfe', HorizntalOrdersMfeElement);
