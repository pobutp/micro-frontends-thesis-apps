import { Component } from '@angular/core';

@Component({
  selector: 'hc-mfe-horizontal-catalog-mfe-entry',
  template: `
    <div class="remote-entry">
      <h2>horizontal-catalog-mfe's Remote Entry Component</h2>
    </div>
  `,
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
