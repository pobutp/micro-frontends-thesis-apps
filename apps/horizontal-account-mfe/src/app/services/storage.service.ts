import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = sessionStorage; // localStorage;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public retrieve(key: string): any {
    const item = this.storage.getItem(key);

    if (item && item !== 'undefined') {
      return JSON.parse(this.storage.getItem(key) ?? '');
    }

    return;
  }

  public store(key: string, value: Storage) {
    this.storage.setItem(key, JSON.stringify(value));
  }
}
