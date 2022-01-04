import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Gateway } from 'src/app/shared/models/iot.model';

import { MaporamaComponent } from './maporama.component';

describe('MaporamaComponent', () => {
  let component: MaporamaComponent;
  let fixture: ComponentFixture<MaporamaComponent>;
  let mockGraphService;
  let mockAppConfigService: Partial<AppConfigService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv', 'loadAppConfig']);
  mockGraphService = jasmine.createSpyObj(['getGateways', 'getGatewayAndPipelines', 'getModels']);

  mockGraphService.getGateways.and.returnValue(of([]));
  mockGraphService.getGatewayAndPipelines.and.returnValue(of([new Gateway()] as Gateway[]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MaporamaComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaporamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
