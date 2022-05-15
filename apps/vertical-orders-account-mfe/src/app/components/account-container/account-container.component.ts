import { Component, OnInit } from '@angular/core';

import { AutorizationService } from '../../services/autorization.service';

@Component({
  selector: 'voa-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss'],
})
export class AccountContainerComponent implements OnInit {
  public authenticated = false;
  public userData: { [key: string]: string } | null = null;

  constructor(private readonly autorizationService: AutorizationService) {}

  ngOnInit() {
    console.log('[Account] Checking authorized ' + this.autorizationService.isAuthorized);
    this.authenticated = !!this.autorizationService.isAuthorized;

    if (this.authenticated) {
      if (this.autorizationService.userData) this.userData = this.autorizationService.userData;
    }
  }
}
