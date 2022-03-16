/* eslint-disable no-restricted-syntax */
import { AfterContentInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { registry } from '../registry';

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
    console.log(this.importName);
    const importFn = registry[this.importName];

    importFn()
      .then((_: any) => console.debug(`element ${this.elementName} loaded!`))
      // TODO If failed display error
      .catch((err: any) =>
        console.error(`error loading ${this.elementName}:`, err)
      );

    const element = document.createElement(this.elementName);
    if (this.vc) {
      this.vc.nativeElement.innerHTML = '';
      this.vc.nativeElement.appendChild(element);
    }
  }
}
