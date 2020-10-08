import { AngularFireDatabase } from '@angular/fire/database';
import { TestBed } from '@angular/core/testing';

import { ResetPasswordService } from './reset-password.service';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  const fireDbStub = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: fireDbStub },
        ResetPasswordService,
      ],
    });
    service = TestBed.inject(ResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Sholud test resetPassword method ', () => {
    const userObj = {
      updatePassword: (pwd) => {
        return Promise.resolve({});
      },
    };
    expect(service.resetPassword).toBeDefined();
    spyOn(service, 'resetPassword').and.callThrough();
    service.resetPassword(userObj, '');
    expect(service.resetPassword).toHaveBeenCalled();
  });
  it('Sholud test resetPassword method ', () => {
    const userObj = {
      updatePassword: (pwd) => {
        return Promise.reject({});
      },
    };
    expect(service.resetPassword).toBeDefined();
    spyOn(service, 'resetPassword').and.callThrough();
    service.resetPassword(userObj, '');
    expect(service.resetPassword).toHaveBeenCalled();
  });
  it('Sholud test reauthenticateUser method ', () => {
    const userObj = {
      reauthenticateWithCredential: (pwd) => {
        return Promise.reject({});
      },
    };
    expect(service.reauthenticateUser).toBeDefined();
    spyOn(service, 'reauthenticateUser').and.callThrough();
    service.reauthenticateUser(userObj, '', '');
    expect(service.reauthenticateUser).toHaveBeenCalled();
  });
  it('Sholud test reauthenticateUser method ', () => {
    const userObj = {
      reauthenticateWithCredential: (pwd) => {
        return Promise.resolve({});
      },
    };
    expect(service.reauthenticateUser).toBeDefined();
    spyOn(service, 'reauthenticateUser').and.callThrough();
    service.reauthenticateUser(userObj, '', '');
    expect(service.reauthenticateUser).toHaveBeenCalled();
  });
});
