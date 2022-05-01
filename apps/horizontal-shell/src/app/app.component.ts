import { connectRouter } from '@angular-architects/module-federation-tools';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigurationService } from './services/configuration.service';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'hs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private readonly configurationService: ConfigurationService,
    private readonly securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.configurationService.init();
    this.securityService.initConfig();
    connectRouter(this.router);
  }
}
