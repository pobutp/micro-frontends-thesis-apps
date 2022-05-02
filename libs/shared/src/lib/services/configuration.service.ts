import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IConfiguration } from '../models/configuration.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private settingsLoadedSource = new Subject<void>();

  serverSettings: IConfiguration | undefined;
  settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady = false;

  constructor(private storageService: StorageService) {
    this.serverSettings = {} as IConfiguration;
    this.serverSettings.identityUrl = this.storageService.retrieve('identityUrl');
    this.serverSettings.purchaseUrl = this.storageService.retrieve('purchaseUrl');
    this.serverSettings.signalrHubUrl = this.storageService.retrieve('signalrHubUrl');
    this.serverSettings.activateCampaignDetailFunction = !!this.storageService.retrieve('activateCampaignDetailFunction');

    console.log('[ACCOUNT] serverSettings', this.serverSettings);

    this.isReady = true;
    this.settingsLoadedSource.next();
  }
}
