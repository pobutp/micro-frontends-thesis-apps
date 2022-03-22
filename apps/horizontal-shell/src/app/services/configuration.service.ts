import { Injectable } from '@angular/core';
import { IConfiguration } from '@micro-frontends-thesis-apps/shared';
import { Subject } from 'rxjs';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  serverSettings: IConfiguration | undefined;
  private settingsLoadedSource = new Subject<void>();
  //settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady = false;

  constructor(private storageService: StorageService) {}

  init(): void {
    // TODO Move URLs to env
    this.serverSettings = {
      purchaseUrl: 'http://host.docker.internal:5202',
      identityUrl: 'http://host.docker.internal:5105',
      signalrHubUrl: 'http://host.docker.internal:5105',
      activateCampaignDetailFunction: false,
    } as IConfiguration;

    // TODO Move storage keys to shared module
    this.storageService.store('identityUrl', this.serverSettings.identityUrl);
    this.storageService.store('purchaseUrl', this.serverSettings.purchaseUrl);
    this.storageService.store('signalrHubUrl', this.serverSettings.signalrHubUrl);
    this.storageService.store('activateCampaignDetailFunction', this.serverSettings.activateCampaignDetailFunction);

    this.isReady = true;
    this.settingsLoadedSource.next();
  }
}
