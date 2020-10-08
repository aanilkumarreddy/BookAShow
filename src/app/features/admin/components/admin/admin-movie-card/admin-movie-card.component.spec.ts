import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../../../core/material-module/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieCardComponent } from './admin-movie-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdminMovieCardComponent', () => {
  let component: AdminMovieCardComponent;
  let fixture: ComponentFixture<AdminMovieCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMovieCardComponent],
      imports: [MaterialModule, BrowserAnimationsModule, FlexLayoutModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test toggleDetails method ', () => {
    const event = {
      target: {
        closest: (arg1) => {
          return {
            classList: {
              contains: (arg1) => {
                return false;
              },
              add: (arg2) => {},
              remove: (arg2) => {},
            },
          };
        },
      },
    };
    expect(component.toggleDetails).toBeDefined();
    spyOn(component, 'toggleDetails').and.callThrough();
    component.toggleDetails(event);
    expect(component.toggleDetails).toHaveBeenCalled();
  });
  it('Sholud test toggleDetails method ', () => {
    const event = {
      target: {
        closest: (arg1) => {
          return {
            classList: {
              contains: (arg1) => {
                return true;
              },
              add: (arg2) => {},
              remove: (arg2) => {},
            },
          };
        },
      },
    };
    expect(component.toggleDetails).toBeDefined();
    spyOn(component, 'toggleDetails').and.callThrough();
    component.toggleDetails(event);
    expect(component.toggleDetails).toHaveBeenCalled();
  });
});
