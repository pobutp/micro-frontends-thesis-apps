import { Injectable } from '@angular/core';
import { IConfiguration, StorageService } from '@micro-frontends-thesis-apps/shared';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  serverSettings: IConfiguration | undefined;
  isReady = false;

  constructor(private readonly storageService: StorageService) {}

  init(): void {
    this.serverSettings = {
      purchaseUrl: 'http://host.docker.internal:5202',
      identityUrl: 'http://host.docker.internal:5105',
      signalrHubUrl: 'http://host.docker.internal:5105',
      activateCampaignDetailFunction: false,
    } as IConfiguration;

    this.storageService.store('identityUrl', this.serverSettings.identityUrl);
    this.storageService.store('purchaseUrl', this.serverSettings.purchaseUrl);
    this.storageService.store('signalrHubUrl', this.serverSettings.signalrHubUrl);
    this.storageService.store('activateCampaignDetailFunction', this.serverSettings.activateCampaignDetailFunction);

    this.isReady = true;
  }
}
