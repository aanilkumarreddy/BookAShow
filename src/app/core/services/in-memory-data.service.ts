import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // constructor() { }
  // createDb(reqInfo?: RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
  //   throw new Error("Method not implemented.");
  // }

  // tslint:disable-next-line: typedef
  createDb() {
    const heroes = [
      { id: 0, name: 'Zero' },
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
    ];
    return { heroes };
  }
}
