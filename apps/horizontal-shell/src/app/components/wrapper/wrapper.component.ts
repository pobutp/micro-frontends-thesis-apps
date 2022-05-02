/* eslint-disable no-restricted-syntax */
import { AfterContentInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { registry } from '../../registry';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hs-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements AfterContentInit {
  @Input() elementName!: string;
  @Input() importName!: string;

  @ViewChild('vc', { read: ElementRef, static: true })
  vc?: ElementRef;

  ngAfterContentInit(): void {
    const importFn = registry[this.importName];

    importFn()
      .then((_: any) => {
        console.debug(`element ${this.elementName} loaded!`);

        const element = document.createElement(this.elementName);

        if (this.vc) {
          this.vc.nativeElement.innerHTML = '';
          this.vc.nativeElement.appendChild(element);
        }
      })
      .catch((err: any) => {
        console.error(`error loading ${this.elementName}:`, err);

        if (this.vc) {
          this.vc.nativeElement.innerHTML = `
          <div class="alert alert-danger d-flex align-items-center" role="alert">
            <div>
              Failed to load ${this.elementName}
            </div>
          </div>
          `;
        }
      });
  }
}
