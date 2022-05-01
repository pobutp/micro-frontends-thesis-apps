import { Component, OnInit } from '@angular/core';
import { ConfigurationService, IOrder } from '@micro-frontends-thesis-apps/shared';
import { catchError, throwError } from 'rxjs';

import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'micro-frontends-thesis-apps-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  private oldOrders: IOrder[] = [];
  private interval = null;
  errorReceived = false;

  orders: IOrder[] = [];

  constructor(private service: OrdersService, private configurationService: ConfigurationService) {}
  // private signalrService: SignalrService

  ngOnInit() {
    if (this.configurationService.isReady) {
      this.getOrders();
    } else {
      this.configurationService.settingsLoaded$.subscribe(() => {
        this.getOrders();
      });
    }

    // this.signalrService.msgReceived$.subscribe(() => this.getOrders());
  }

  getOrders(): void {
    this.errorReceived = false;
    this.service
      .getOrders()
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe((orders: any) => {
        this.orders = orders;
        this.oldOrders = this.orders;
        console.log('orders items retrieved: ' + orders.length);
      });
  }

  cancelOrder(orderNumber: string): void {
    this.errorReceived = false;
    this.service
      .cancelOrder(+orderNumber)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe(() => {
        console.log('order canceled: ' + orderNumber);
      });
  }

  private handleError(error: any): any {
    this.errorReceived = true;
    return throwError(() => error);
  }
}
