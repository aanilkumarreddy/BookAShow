import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call createDb method', () => {
    expect(service.createDb).toBeDefined();
    spyOn(service, 'createDb').and.callThrough();
    service.createDb();
    expect(service.createDb).toHaveBeenCalled();
  });
  it('can call genId method', () => {
    expect(service.genId).toBeDefined();
    spyOn(service, 'genId').and.callThrough();
    service.genId([1, 2, 3]);
    expect(service.genId).toHaveBeenCalled();
  });
});
