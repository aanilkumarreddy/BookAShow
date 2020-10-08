import { AngularFireDatabase } from '@angular/fire/database';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { AngularFireAuth } from '@angular/fire/auth';

describe('LoginService', () => {
  let service: LoginService;

  const updateStub = {
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
  };

  const fireDbStub = {
    object: jasmine.createSpy('object').and.returnValue(updateStub),
  };
  const fireAuthStub = {
    signInWithPopup: jasmine
      .createSpy('signInWithPopup')
      .and.returnValues(Promise.resolve({}), Promise.reject({})),
    // signInWithPopup: (arg1) => {
    //   return Promise.resolve({});
    // },
    signInWithEmailAndPassword: (email, pwd) => {
      return Promise.resolve({});
    },
    createUserWithEmailAndPassword: (email, pwd) => {
      return Promise.resolve({
        user: {
          updateProfile: (name) => {},
        },
      });
    },
    signOut: () => {
      return Promise.resolve({});
    },
    authState: {
      subscribe: (res, err) => {
        res(), err();
      },
    },
    sendPasswordResetEmail: (email) => {
      return Promise.resolve({});
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: fireAuthStub },
        { provide: AngularFireDatabase, useValue: fireDbStub },
      ],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call loginWithGoogle method', () => {
    expect(service.loginWithGoogle).toBeDefined();
    spyOn(service, 'loginWithGoogle').and.callThrough();
    service.loginWithGoogle();
    expect(service.loginWithGoogle).toHaveBeenCalled();
  });
  it('can call loginWithEmail method', () => {
    expect(service.loginWithEmail).toBeDefined();
    spyOn(service, 'loginWithEmail').and.callThrough();
    service.loginWithEmail('', '');
    expect(service.loginWithEmail).toHaveBeenCalled();
  });
  it('can call signupWithEmail method', () => {
    expect(service.signupWithEmail).toBeDefined();
    spyOn(service, 'signupWithEmail').and.callThrough();
    service.signupWithEmail('', '', '');
    expect(service.signupWithEmail).toHaveBeenCalled();
  });
  it('can call fetchCurrentUser method', () => {
    expect(service.fetchCurrentUser).toBeDefined();
    spyOn(service, 'fetchCurrentUser').and.callThrough();
    service.fetchCurrentUser();
    expect(service.fetchCurrentUser).toHaveBeenCalled();
  });
  it('can call logout method', () => {
    expect(service.logout).toBeDefined();
    spyOn(service, 'logout').and.callThrough();
    service.logout();
    expect(service.logout).toHaveBeenCalled();
  });
  it('can call updateMobileNum method', () => {
    expect(service.updateMobileNum).toBeDefined();
    spyOn(service, 'updateMobileNum').and.callThrough();
    service.updateMobileNum(987654321, '1AgjhfGFDDSHh');
    expect(service.updateMobileNum).toHaveBeenCalled();
  });
  it('can call forgotPassword method', () => {
    expect(service.forgotPassword).toBeDefined();
    spyOn(service, 'forgotPassword').and.callThrough();
    service.forgotPassword('gfg@h');
    expect(service.forgotPassword).toHaveBeenCalled();
  });
});
