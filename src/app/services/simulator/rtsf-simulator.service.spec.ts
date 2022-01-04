import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfigService } from '../config/app-config.service';

import { RtsfSimulatorService } from './rtsf-simulator.service';

describe('RtsfSimulatorService', () => {
  let service: RtsfSimulatorService;
  let mockAppConfigService: Partial<AppConfigService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService }
      ]
    });
    service = TestBed.inject(RtsfSimulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
