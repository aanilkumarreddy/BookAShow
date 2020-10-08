import { Subject } from 'rxjs';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { MovieService } from './../../../movie/services/movie-service/movie.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../../core/material-module/material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  const movieDetails = [
    {
      id: 11,
      title: 'KGF',
      theater: {
        fromDate: '09-20-2020',
      },
    },
    {
      id: 12,
      title: 'Baahubali',
      theater: {
        fromDate: '10-30-2020',
      },
    },
    {
      id: 13,
      title: 'Darbar',
    },
  ];
  const movieStub = {
    getMovieList: () => {
      return Promise.resolve(movieDetails);
    },
  };
  const spinnyStub = {
    spin$: new Subject(),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
      ],
      providers: [
        { provide: MovieService, useValue: movieStub },
        { provide: ManualSpinnyService, useValue: spinnyStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
