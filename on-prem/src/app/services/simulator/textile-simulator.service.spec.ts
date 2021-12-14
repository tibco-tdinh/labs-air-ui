import { TestBed } from '@angular/core/testing';

import { TextileSimulatorService } from './textile-simulator.service';

describe('TextileSimulatorService', () => {
  let service: TextileSimulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextileSimulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
