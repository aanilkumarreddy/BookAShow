import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

describe('AlertService', () => {
  let service: AlertService;
  const fireMessagingStub = {
    messages: of({
      onMessage: {
        bind: (arg) => {
          return {
            bind: (arg1) => {},
          };
        },
      },
      onTokenRefresh: {
        bind: (arg) => {
          return {};
        },
      },
    }),
    requestToken: {
      subscribe: (res, err) => {
        res(), err();
      },
    },
  };
  const httpStub = {
    post: (url, arg1) => {
      return {
        subscribe: (res, err) => {
          res(), err();
        },
      };
    },
  };
  const authStub = {
    authState: of({ uid: '1fhgFSdhgd@jjjh' }),
  };
  const fireDbStub = {
    object: (path) => {
      return {
        update: (obj) => {
          return Promise.resolve({});
        },
      };
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireMessaging, useValue: fireMessagingStub },
        { provide: AngularFireDatabase, useValue: fireDbStub },
        { provide: AngularFireAuth, useValue: authStub },
        { provide: HttpClient, useValue: httpStub },
      ],
    });
    service = TestBed.inject(AlertService);
    service.currentMessage = new BehaviorSubject({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call updateToken method', () => {
    expect(service.updateToken).toBeDefined();
    spyOn(service, 'updateToken').and.callThrough();
    service.updateToken('1Ahfkl', 'FChgfhhgdS-FDg');
    expect(service.updateToken).toHaveBeenCalled();
  });
  it('can call updateAlert method', () => {
    expect(service.updateAlert).toBeDefined();
    spyOn(service, 'updateAlert').and.callThrough();
    service.updateAlert({}, 'FChgfhhgdS-FDg');
    expect(service.updateAlert).toHaveBeenCalled();
  });
  it('can call receiveMessage method', () => {
    expect(service.receiveMessage).toBeDefined();
    spyOn(service, 'receiveMessage').and.callThrough();
    service.receiveMessage();
    expect(service.receiveMessage).toHaveBeenCalled();
  });
  it('can call requestPermission method', () => {
    expect(service.requestPermission).toBeDefined();
    spyOn(service, 'requestPermission').and.callThrough();
    service.requestPermission('aHFDREGFDJhgfhgfjh');
    expect(service.requestPermission).toHaveBeenCalled();
  });
  it('can call sendPushNotification method', () => {
    expect(service.sendPushNotification).toBeDefined();
    spyOn(service, 'sendPushNotification').and.callThrough();
    service.sendPushNotification('aHFDREGFDJhgfhgfjh', '', '');
    expect(service.sendPushNotification).toHaveBeenCalled();
  });
});
