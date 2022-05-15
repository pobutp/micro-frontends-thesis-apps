import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';

import { ConfigurationService } from './configuration.service';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private _hubConnection!: HubConnection;
  private SignalrHubUrl = '';
  private msgSignalrSource = new Subject<void>();
  msgReceived$ = this.msgSignalrSource.asObservable();

  constructor(private securityService: SecurityService, private configurationService: ConfigurationService) {
    if (this.configurationService.isReady) {
      this.SignalrHubUrl = this.configurationService.serverSettings?.signalrHubUrl ?? '';
      this.init();
    } else {
      this.configurationService.settingsLoaded$.subscribe((x) => {
        this.SignalrHubUrl = this.configurationService.serverSettings?.signalrHubUrl ?? '';
        this.init();
      });
    }
  }

  public stop() {
    this._hubConnection.stop();
  }

  private init() {
    if (this.securityService.isAuthorized == true) {
      this.register();
      this.stablishConnection();
      this.registerHandlers();
    }
  }

  private register() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.SignalrHubUrl + '/hub/notificationhub', {
        accessTokenFactory: () => this.securityService.GetToken(),
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  private stablishConnection() {
    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
      })
      .catch(() => {
        console.log('Error while establishing connection');
      });
  }

  private registerHandlers() {
    this._hubConnection.on('UpdatedOrderState', (msg) => {
      console.log(`Order ${msg.orderId} updated to ${msg.status}`);
      console.log('Updated to status: ' + msg.status, 'Order Id: ' + msg.orderId);
      this.msgSignalrSource.next();
    });
  }
}
