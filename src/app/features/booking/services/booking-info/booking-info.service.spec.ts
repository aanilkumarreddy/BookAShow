import { TestBed } from '@angular/core/testing';

import { BookingInfoService } from './booking-info.service';

describe('BookingInfoService', () => {
  let service: BookingInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingInfoService],
    });
    service = TestBed.inject(BookingInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call setBookingInfo method', () => {
    expect(service.setBookingInfo).toBeDefined();
    spyOn(service, 'setBookingInfo').and.callThrough();
    service.setBookingInfo({});
    expect(service.setBookingInfo).toHaveBeenCalled();
  });
  it('can call getBookingInfo method', () => {
    expect(service.getBookingInfo).toBeDefined();
    spyOn(service, 'getBookingInfo').and.callThrough();
    service.getBookingInfo();
    expect(service.getBookingInfo).toHaveBeenCalled();
  });
});
