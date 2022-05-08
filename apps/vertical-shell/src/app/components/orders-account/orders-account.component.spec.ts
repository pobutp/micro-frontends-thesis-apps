import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAccountComponent } from './orders-account.component';

describe('OrdersAccountComponent', () => {
  let component: OrdersAccountComponent;
  let fixture: ComponentFixture<OrdersAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
