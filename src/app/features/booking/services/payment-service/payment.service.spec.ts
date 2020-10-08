import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  const httpClientStub = {
    put: (url, obj) => {
      return {
        toPromise: () => {
          return Promise.resolve({});
        },
      };
    },
  };
  const updateobj = {
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve({})),
  };
  const fireDbStub = {
    object: jasmine.createSpy('object').and.returnValue(updateobj),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientStub,
        },
        {
          provide: AngularFireDatabase,
          useValue: fireDbStub,
        },
        PaymentService,
      ],
    });
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call storeUserBookingDetails method', () => {
    expect(service.storeUserBookingDetails).toBeDefined();
    spyOn(service, 'storeUserBookingDetails').and.callThrough();
    service.storeUserBookingDetails({}, '1AgfkhfDFhz');
    expect(service.storeUserBookingDetails).toHaveBeenCalled();
  });
  it('can call blockSeats method', () => {
    expect(service.blockSeats).toBeDefined();
    spyOn(service, 'blockSeats').and.callThrough();
    service.blockSeats({});
    expect(service.blockSeats).toHaveBeenCalled();
  });
});
