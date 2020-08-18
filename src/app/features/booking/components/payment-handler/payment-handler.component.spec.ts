import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHandlerComponent } from './payment-handler.component';

describe('PaymentHandlerComponent', () => {
  let component: PaymentHandlerComponent;
  let fixture: ComponentFixture<PaymentHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
