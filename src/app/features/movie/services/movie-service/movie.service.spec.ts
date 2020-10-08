import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  const httpClientStub = {
    put: (url, obj) => {
      return {
        toPromise: () => {
          return Promise.resolve({});
        },
      };
    },
    post: (url, obj) => {
      return {
        toPromise: () => {
          return Promise.resolve({});
        },
      };
    },
    get: (url: string) => {
      if (url.indexOf('movies') > -1) {
        return {
          toPromise: () => {
            return Promise.resolve({});
          },
        };
      } else {
        return of([{ id: 1 }]);
      }
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientStub }],
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call searchMovie method', () => {
    expect(service.searchMovie).toBeDefined();
    spyOn(service, 'searchMovie').and.callThrough();
    service.searchMovie('kgf');
    expect(service.searchMovie).toHaveBeenCalled();
  });
  it('can call getMovieList method', () => {
    expect(service.getMovieList).toBeDefined();
    spyOn(service, 'getMovieList').and.callThrough();
    service.getMovieList();
    expect(service.getMovieList).toHaveBeenCalled();
  });
  it('can call getMovieById method', () => {
    expect(service.getMovieById).toBeDefined();
    spyOn(service, 'getMovieById').and.callThrough();
    service.getMovieById(1);
    expect(service.getMovieById).toHaveBeenCalled();
  });
  it('can call addMovie method', () => {
    expect(service.addMovie).toBeDefined();
    spyOn(service, 'addMovie').and.callThrough();
    service.addMovie({});
    expect(service.addMovie).toHaveBeenCalled();
  });
  it('can call getPosition method', () => {
    expect(service.getPosition).toBeDefined();
    spyOn(service, 'getPosition').and.callThrough();
    service.getPosition();
    expect(service.getPosition).toHaveBeenCalled();
  });
  it('can call getImdbMovieDetails method', () => {
    expect(service.getImdbMovieDetails).toBeDefined();
    spyOn(service, 'getImdbMovieDetails').and.callThrough();
    service.getImdbMovieDetails(1);
    expect(service.getImdbMovieDetails).toHaveBeenCalled();
  });
});
