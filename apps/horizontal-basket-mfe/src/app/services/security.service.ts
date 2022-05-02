import { Injectable } from '@angular/core';
import { StorageService } from '@micro-frontends-thesis-apps/shared';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  public userData: { [key: string]: string } | undefined;
  public isAuthorized: boolean | undefined;

  constructor(private storageService: StorageService) {
    if (storageService.retrieve('isAuthorized') !== '') {
      this.isAuthorized = !!storageService.retrieve('isAuthorized');
      this.userData = storageService.retrieve('userData');
    }
  }

  getToken(): string {
    return this.storageService.retrieve('authorizationData');
  }
}
