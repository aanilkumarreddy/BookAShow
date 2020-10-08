import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { MOVIES } from './../constants/movies.constant';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb(): any {
    const movies = MOVIES;
    return { movies };
  }

  genId(myTable): number {
    return myTable.length > 0 ? Math.max(...myTable.map((t) => t.id)) + 1 : 11;
  }

  // genId<T extends Hero | Crises | SuperHero>(myTable: T[]): number {
  //   return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  // }
}
