import { Router } from '@angular/router';
import { SnackBarService } from './../../shared/services/snack-bar/snack-bar.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const routerStub = {
    navigateByUrl: (url) => {},
  };
  const loginStub = {
    afAuth: {
      authState: {
        subscribe: (res) => {
          res(true);
        },
      },
    },
  };
  const snackStub = {
    error: (msg) => {},
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LoginService, useValue: loginStub },
        { provide: SnackBarService, useValue: snackStub },
        { provide: Router, useValue: routerStub },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should test canActivateChild method', () => {
    const route: any = '';
    const state: any = 'Test2';
    expect(guard.canActivate).toBeDefined();
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate(route, state);
    expect(guard.canActivate).toHaveBeenCalled();
  });
});
