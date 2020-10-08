import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/core/material-module/material.module';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ManualSpinnyService } from 'src/app/core/services/manual-spinny/manual-spinny.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';
import { AlertService } from '../../../services/alert-service/alert.service';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const alertStub = {
    updateAlert: (arg1, arg2) => {
      return Promise.resolve({});
    },
  };
  const routerStub = {
    navigate: (url) => {},
  };
  const snackBarStub = {
    error: (msg) => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        // { provide: ManualSpinnyService, useValue: spinnyStub },
        { provide: AlertService, useValue: alertStub },
        { provide: SnackBarService, useValue: snackBarStub },
        { provide: Router, useValue: routerStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movieDetails = {
      id: 11,
    };
    component.userDetails = {
      uid: '1AkjdsjfdsKwdfkdsJsak',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test matCardClick method ', () => {
    expect(component.matCardClick).toBeDefined();
    spyOn(component, 'matCardClick').and.callThrough();
    component.matCardClick({ id: 1 });
    expect(component.matCardClick).toHaveBeenCalled();
  });
  it('Sholud test matCardClick method ', () => {
    expect(component.matCardClick).toBeDefined();
    spyOn(component, 'matCardClick').and.callThrough();
    component.matCardClick({ id: 1 });
    expect(component.matCardClick).toHaveBeenCalled();
  });
  it('Sholud test getImagePath method ', () => {
    expect(component.getImagePath).toBeDefined();
    spyOn(component, 'getImagePath').and.callThrough();
    component.getImagePath({ poster_url: '../sdfd../' });
    expect(component.getImagePath).toHaveBeenCalled();
  });
  it('Sholud test getImagePath method ', () => {
    expect(component.getImagePath).toBeDefined();
    spyOn(component, 'getImagePath').and.callThrough();
    component.getImagePath({ dynamicImageUrl: 'dsf' });
    expect(component.getImagePath).toHaveBeenCalled();
  });
  it('Sholud test getImagePath method ', () => {
    expect(component.getImagePath).toBeDefined();
    spyOn(component, 'getImagePath').and.callThrough();
    component.getImagePath({ id: 11 });
    expect(component.getImagePath).toHaveBeenCalled();
  });
  it('Sholud test shareMovie method ', () => {
    navigator.share = () => {
      return Promise.resolve();
    };
    expect(component.shareMovie).toBeDefined();
    spyOn(component, 'shareMovie').and.callThrough();
    component.shareMovie({ id: 11 });
    expect(component.shareMovie).toHaveBeenCalled();
  });
  it('Sholud test addAlert method ', () => {
    const event = {
      stopPropagation: () => {},
    };
    expect(component.addAlert).toBeDefined();
    spyOn(component, 'addAlert').and.callThrough();
    component.addAlert(event, {});
    expect(component.addAlert).toHaveBeenCalled();
  });
  it('Sholud test addAlert method ', () => {
    const event = {
      stopPropagation: () => {},
    };
    component.userDetails = {};
    expect(component.addAlert).toBeDefined();
    spyOn(component, 'addAlert').and.callThrough();
    component.addAlert(event, {});
    expect(component.addAlert).toHaveBeenCalled();
  });
});
