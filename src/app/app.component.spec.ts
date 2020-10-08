import { Subject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ManualSpinnyService } from './core/services/manual-spinny/manual-spinny.service';
import { MaterialModule } from './core/material-module/material.module';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const spinnyStub = {
    spin$: new Subject(),
  };
  const overlayStub = {
    getContainerElement: () => {
      return {
        classList: {
          add: (arg1) => {},
          remove: (arg2) => {},
        },
      };
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ManualSpinnyService, useValue: spinnyStub },
        { provide: OverlayContainer, useValue: overlayStub },
      ],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test toggleTheme method ', () => {
    expect(component.toggleTheme).toBeDefined();
    spyOn(component, 'toggleTheme').and.callThrough();
    component.toggleTheme({});
    expect(component.toggleTheme).toHaveBeenCalled();
  });
  it('Sholud test toggleTheme method ', () => {
    component.isDarkTheme = false;
    expect(component.toggleTheme).toBeDefined();
    spyOn(component, 'toggleTheme').and.callThrough();
    component.toggleTheme({});
    expect(component.toggleTheme).toHaveBeenCalled();
  });
  it('Sholud test gotoTop method ', () => {
    component.isDarkTheme = false;
    expect(component.gotoTop).toBeDefined();
    spyOn(component, 'gotoTop').and.callThrough();
    component.gotoTop();
    expect(component.gotoTop).toHaveBeenCalled();
  });
  it('Sholud test checkScroll method ', () => {
    expect(component.checkScroll).toBeDefined();
    spyOn(component, 'checkScroll').and.callThrough();
    component.checkScroll();
    expect(component.checkScroll).toHaveBeenCalled();
  });
});
