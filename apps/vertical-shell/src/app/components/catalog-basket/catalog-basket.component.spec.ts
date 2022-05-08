import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogBasketComponent } from './catalog-basket.component';

describe('CatalogBasketComponent', () => {
  let component: CatalogBasketComponent;
  let fixture: ComponentFixture<CatalogBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogBasketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
