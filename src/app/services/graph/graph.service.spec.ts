import { TestBed } from '@angular/core/testing';

import { GraphService } from './graph.service';

describe('GraphService', () => {
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: GraphService, useValue: mockGraphService }
    ]
  }));

  it('should be created', () => {
    const service: GraphService = TestBed.get(GraphService);
    expect(service).toBeTruthy();
  });
});
