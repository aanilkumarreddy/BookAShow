import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import 'rxjs/add/operator/map';
// import {map}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://api.themoviedb.org/3/movie/';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = '54dd51cfd304895cc0480375a0d4422c';
  private language = 'en';
  isBrowser = false;
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getMovieList(): Promise<any> {
    return this.httpClient.get('api/movies').toPromise();
  }

  getMovieById(id: number): Promise<any> {
    return this.httpClient.get('/api/movies/' + id).toPromise();
  }

  addMovie(movieObj: any): Promise<any> {
    return this.httpClient.post('/api/movies/', movieObj).toPromise();
  }

  getPosition(): Promise<any> {
    if (this.isBrowser) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (resp) => {
            resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
          },
          (err) => {
            reject(err);
          }
        );
      });
    } else {
      return Promise.reject({});
    }
  }

  getImdbMovieDetails(id): any {
    const detailsUrl = `${this.url}${id}?api_key=${this.apiKey}&language=${this.language}`;

    return this.httpClient.get(detailsUrl).pipe(
      map(
        (res: any) => {
          return res;
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  searchMovie(query: string): Promise<any> {
    const searchUrl =
      this.searchUrl +
      '?api_key=' +
      this.apiKey +
      '&language=undefined&query=' +
      query;
    return this.httpClient.get(searchUrl).toPromise();
  }
}
