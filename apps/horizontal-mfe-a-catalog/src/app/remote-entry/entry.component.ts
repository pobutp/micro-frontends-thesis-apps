import { Component } from '@angular/core';

@Component({
  selector: 'micro-frontends-thesis-apps-horizontal-mfe-a-catalog-entry',
  template: `<div class="remote-entry">
    <h2>horizontal-mfe-a-catalog's Remote Entry Component</h2>
  </div>`,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent {}
