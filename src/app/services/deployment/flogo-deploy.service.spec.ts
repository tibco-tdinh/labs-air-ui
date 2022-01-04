import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppConfigService } from '../config/app-config.service';

import { FlogoDeployService } from './flogo-deploy.service';

describe('FlogoDeployService', () => {
  let mockAppConfigService: Partial<AppConfigService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      { provide: AppConfigService, useValue: mockAppConfigService }
    ]
  }));

  it('should be created', () => {
    const service: FlogoDeployService = TestBed.inject(FlogoDeployService);
    expect(service).toBeTruthy();
  });

  //expect registration to be success
});
