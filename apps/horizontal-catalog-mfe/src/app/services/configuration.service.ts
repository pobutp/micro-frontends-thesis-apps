import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IConfiguration } from '../models/configuration.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  serverSettings: IConfiguration | undefined;
  // observable that is fired when settings are loaded from server
  private settingsLoadedSource = new Subject<void>();
  settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady = false;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  load() {
    // const baseURI = document.baseURI.endsWith('/')
    //   ? document.baseURI
    //   : `${document.baseURI}/`;
    //const baseURI = 'http://host.docker.internal:5202/';
    //const url = `${baseURI}Home/Configuration`;
    // this.http.get(url).subscribe((response) => {
    //   console.log('server settings loaded');
    //this.serverSettings = response as IConfiguration;

    // TODO Load configuration in shell
    this.serverSettings = {
      purchaseUrl: 'http://host.docker.internal:5202',
      identityUrl: 'http://host.docker.internal:5105',
      signalrHubUrl: 'http://host.docker.internal:5105',
      activateCampaignDetailFunction: false,
    } as IConfiguration;

    console.log(this.serverSettings);
    this.storageService.store('identityUrl', this.serverSettings.identityUrl);
    this.storageService.store('purchaseUrl', this.serverSettings.purchaseUrl);
    this.storageService.store(
      'signalrHubUrl',
      this.serverSettings.signalrHubUrl
    );
    this.storageService.store(
      'activateCampaignDetailFunction',
      this.serverSettings.activateCampaignDetailFunction
    );
    this.isReady = true;
    this.settingsLoadedSource.next();
    // });
  }
}
