import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderDetail } from '../../models/order-detail.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'ho-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  public order: IOrderDetail = <IOrderDetail>{};

  constructor(private service: OrdersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.getOrder(id);
    });
  }

  getOrder(id: number) {
    this.service.getOrder(id).subscribe((order) => {
      this.order = order;
      console.log('order retrieved: ' + order.ordernumber);
      console.log(this.order);
    });
  }
}
