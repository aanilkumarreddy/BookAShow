import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';

import { ManualSpinnyService } from './manual-spinny.service';

describe('ManualSpinnyService', () => {
  let service: ManualSpinnyService;
  const overlayStub = {
    create: (arg1) => {},
    position: () => {
      return {
        global: () => {
          return {
            centerHorizontally: () => {
              return { centerVertically: () => {} };
            },
          };
        },
      };
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Overlay, useValue: overlayStub }],
    });
    service = TestBed.inject(ManualSpinnyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call stopSpinner method', () => {
    service.spinnerTopRef = {
      hasAttached: () => {
        return false;
      },
      detach: () => {},
      attach: (arg1) => {},
    };
    service.spin$.next(true);
    expect(service.stopSpinner).toBeDefined();
    spyOn(service, 'stopSpinner').and.callThrough();
    service.stopSpinner();
    expect(service.stopSpinner).toHaveBeenCalled();
  });
});
