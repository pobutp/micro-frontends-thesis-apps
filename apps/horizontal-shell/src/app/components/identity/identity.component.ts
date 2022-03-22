import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'hs-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
})
export class IdentityComponent implements OnInit {
  public authenticated = false;
  public userName = '';

  private subscription: Subscription | undefined;

  constructor(private readonly service: SecurityService) {
    //private signalrService: SignalrService
  }

  ngOnInit() {
    this.subscription = this.service.authenticationChallenge$.subscribe((res) => {
      this.authenticated = res;
      this.userName = this.service.UserData.email;
    });

    if (window.location.hash) {
      this.service.AuthorizedCallback();
    }

    console.log('identity component, checking authorized' + this.service.isAuthorized);
    this.authenticated = !!this.service.isAuthorized;

    if (this.authenticated) {
      if (this.service.UserData) this.userName = this.service.UserData.email;
    }
  }

  logoutClicked(event: any) {
    event.preventDefault();
    console.log('Logout clicked');
    this.logout();
  }

  login() {
    this.service.Authorize();
  }

  logout() {
    //this.signalrService.stop();
    this.service.Logoff();
  }
}
