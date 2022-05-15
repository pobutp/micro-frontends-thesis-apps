import { connectRouter } from '@angular-architects/module-federation-tools';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutorizationService } from '../../services/autorization.service';

@Component({
  selector: 'voa-orders-container',
  templateUrl: './orders-container.component.html',
  styleUrls: ['./orders-container.component.scss'],
})
export class OrdersContainerComponent implements OnInit {
  public authenticated = false;

  constructor(private router: Router, private readonly autorizationService: AutorizationService) {}

  ngOnInit() {
    console.log('[Orders] Checking authorized ' + this.autorizationService.isAuthorized);
    this.authenticated = !!this.autorizationService.isAuthorized;
    connectRouter(this.router);
  }
}
