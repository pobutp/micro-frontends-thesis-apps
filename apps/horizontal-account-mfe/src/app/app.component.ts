import { Component, OnInit } from '@angular/core';

import { AutorizationService } from './services/autorization.service';

@Component({
  selector: 'ha-mfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public authenticated = false;
  public userData: { [key: string]: string } | null = null;

  constructor(private readonly autorizationService: AutorizationService) {
    //private signalrService: SignalrService
  }

  ngOnInit() {
    console.log('[Account] Checking authorized' + this.autorizationService.isAuthorized);
    this.authenticated = !!this.autorizationService.isAuthorized;

    if (this.authenticated) {
      if (this.autorizationService.userData) this.userData = this.autorizationService.userData;
    }
  }
}
