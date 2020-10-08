import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  const routerStub = {
    navigateByUrl: (url) => {},
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerStub }],
    });
    guard = TestBed.inject(AdminGuard);
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
  it('should test canActivateChild method', () => {
    const route: any = '';
    const state: any = 'Test2';
    sessionStorage.setItem('isLoggedIn', 'admin@admin.com');
    expect(guard.canActivate).toBeDefined();
    spyOn(guard, 'canActivate').and.callThrough();
    guard.canActivate(route, state);
    expect(guard.canActivate).toHaveBeenCalled();
  });
});
