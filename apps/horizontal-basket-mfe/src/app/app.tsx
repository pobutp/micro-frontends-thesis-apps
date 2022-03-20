export function App() {
  return (
    <>
      <div className="hb-basket mt-3 mb-3">
        <div className="container">
          {/* <div *ngFor="let errorMessage of errorMessages">
              <div className="hb-basket-alert row">
                  <div className="alert alert-warning" role="alert">&nbsp;{{errorMessage}}</div>
              </div>
          </div> */}

          <div className="row">
            <div className="col-12">
              <h2 className="hb-basket-title">Your shopping bag</h2>
            </div>
            <div className="col-12">
              <div className="hb-basket-items row">
                {/* *ngFor="let item of basket?.items" */}
                <div className="col-12">
                  <article className="hb-basket-item">
                    <div className="hb-basket-thumbnail-wrapper">
                      {/* (click)="deleteItem(item.id)" */}
                      <div className="hb-basket-delete">
                        <button type="button" className="btn btn-outline-secondary">
                          <img className="hb-basket-delete-svg" src="assets/icons/bag-dash.svg" alt="Delete" />
                        </button>
                      </div>
                      {/* {{item.pictureUrl}} */}
                      <img className="hb-basket-thumbnail" src="" alt="Product Name" />
                    </div>
                    <div className="hb-basket-title">
                      Product Name
                      {/* {{item.productName}} */}
                    </div>
                    <div className="hb-basket-description divider d-flex align-items-center justify-content-between">
                      <div className="">
                        $123
                        {/* {{item.unitPrice | number:'.2-2'}} */}
                      </div>
                      <div className="hb-basket-buttons d-flex justify-content-center">
                        {/* [ngClass]="{'hb-basket-button': true, 'is-disabled': item.quantity === 1}" 
                                        (click)="itemQuantityChanged(item, item.quantity-1)" */}
                        <div className="btn-group">
                          <button type="button" className="hb-basket-button btn btn-outline-secondary">
                            <img className="hb-basket-button-svg" src="assets/icons/dash.svg" alt="Less" />
                          </button>
                          <button type="button" className="hb-basket-quantity btn btn-outline-secondary" disabled>
                            1{/* {{item.quantity}} */}
                          </button>
                          <button type="button" className="hb-basket-button btn btn-outline-secondary">
                            <img className="hb-basket-button-svg" src="assets/icons/plus.svg" alt="Less" />
                          </button>
                        </div>
                        {/* <button></button>
                        (click)="itemQuantityChanged(item, item.quantity+1)"
                        <button className="hb-basket-button">
                          <img className="hb-basket-button-svg" src="assets/icons/plus.svg" alt="More" />
                        </button> */}
                      </div>
                      <div className="hb-basket-price">
                        $123
                        {/* {{(item.unitPrice * item.quantity) | number:'.2-2'}} */}
                      </div>
                    </div>
                    {/* *ngIf="item.oldUnitPrice > 0" */}
                    {/* <div className="">
                      {{item.oldUnitPrice}}
                      &nbsp;Note that the price of this article changed in our Catalog. The old price when you originally added it to the
                      basket was $ 123
                    </div> */}
                  </article>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="hb-basket-checkout">
                {/* {{basket?.items ? basket?.items.length : 0}} */}
                <div className="mb-3 u-text-sm">(3 items)</div>

                <div className="d-flex justify-content-between align-items-center font-weight-bolder">
                  <div>TOTAL</div>
                  <div>
                    $123
                    {/* ${{totalPrice | number:'.2-2'}} */}
                  </div>
                </div>
              </div>

              <div className="divider u-background-brightest bt-4">
                <div>
                  {/* (click)="checkOut($event)" */}
                  <button className="btn btn-primary w-100">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div />
    </>
  );
}

export default App;
