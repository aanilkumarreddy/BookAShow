import { MatSnackBar } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  const snackStub = {
    open: (arg1?, arg2?, arg3?) => {},
    dismiss: () => {},
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: snackStub }],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call error method', () => {
    expect(service.error).toBeDefined();
    spyOn(service, 'error').and.callThrough();
    service.error('');
    expect(service.error).toHaveBeenCalled();
  });
  it('can call success method', () => {
    expect(service.success).toBeDefined();
    spyOn(service, 'success').and.callThrough();
    service.success('');
    expect(service.success).toHaveBeenCalled();
  });
  it('can call warning method', () => {
    expect(service.warning).toBeDefined();
    spyOn(service, 'warning').and.callThrough();
    service.warning('');
    expect(service.warning).toHaveBeenCalled();
  });
});
