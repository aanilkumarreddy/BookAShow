import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/core/material-module/material.module';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ManualSpinnyService } from 'src/app/core/services/manual-spinny/manual-spinny.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';
import { of, Subject } from 'rxjs';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  const spinnyStub = {
    spin$: new Subject(),
  };
  const authState = {
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
    providerData: [
      {
        providerId: 'emaill',
      },
    ],
  };
  const data = of({ id: 1, name: '', mobile: 9154429081 });

  const objectFireDb = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
  };
  const fireDbStub = {
    object: jasmine.createSpy('object').and.returnValue(objectFireDb),
  };
  const loginStub = {
    afAuth: {
      authState: of(authState),
    },
    db: fireDbStub,
    updateDisplayName: (arg1, arg2) => {
      return Promise.resolve({});
    },
    updateMobileNum: (arg1, arg2) => {
      return Promise.resolve({});
    },
  };

  const snackBarStub = {
    error: () => {},
    success: () => {},
  };

  const routerStub = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ManualSpinnyService, useValue: spinnyStub },
        { provide: LoginService, useValue: loginStub },
        { provide: SnackBarService, useValue: snackBarStub },
        { provide: Router, useValue: routerStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test updateProfile method ', () => {
    component.userForm.patchValue({
      name: 'Anil',
      mobile: 9876543210,
    });
    component.userForm.get('name').markAsDirty();
    component.userForm.get('mobile').markAsDirty();
    expect(component.updateProfile).toBeDefined();
    spyOn(component, 'updateProfile').and.callThrough();
    component.updateProfile();
    expect(component.updateProfile).toHaveBeenCalled();
  });
});
