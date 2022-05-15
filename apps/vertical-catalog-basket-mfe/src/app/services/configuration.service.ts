import { Injectable } from '@angular/core';
import { IConfiguration, StorageService } from '@micro-frontends-thesis-apps/shared';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  serverSettings: IConfiguration | undefined;
  private settingsLoadedSource = new Subject<void>();
  settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady = false;

  constructor(private readonly storageService: StorageService) {}

  init(): void {
    this.serverSettings = {} as IConfiguration;
    this.serverSettings.identityUrl = this.storageService.retrieve('identityUrl');
    this.serverSettings.purchaseUrl = this.storageService.retrieve('purchaseUrl');
    this.serverSettings.signalrHubUrl = this.storageService.retrieve('signalrHubUrl');
    this.serverSettings.activateCampaignDetailFunction = this.storageService.retrieve('activateCampaignDetailFunction');

    console.log('[CATALOG-BASKET] serverSettings', this.serverSettings);

    this.isReady = true;
    this.settingsLoadedSource.next();
  }
}
