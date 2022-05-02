import { connectRouter } from '@angular-architects/module-federation-tools';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventDispatcherService, GlobalCustomEvents } from '@micro-frontends-thesis-apps/shared';
import { Subject, takeUntil } from 'rxjs';

import { ConfigurationService } from './services/configuration.service';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'hs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private readonly configurationService: ConfigurationService,
    private readonly securityService: SecurityService,
    private readonly eventDispatcherService: EventDispatcherService
  ) {}

  ngOnInit(): void {
    this.configurationService.init();
    this.securityService.initConfig();
    connectRouter(this.router);
    this.initGlobalEventListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private initGlobalEventListeners(): void {
    this.eventDispatcherService
      .on(GlobalCustomEvents.NAVIGATE)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const url = event.detail.url;
        this.router.navigate([url]);
      });
  }
}
