import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { EdgeService } from 'src/app/services/edge/edge.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { PipelineInferencingComponent } from './pipeline-inferencing.component';

describe('PipelineInferencingComponent', () => {
  let component: PipelineInferencingComponent;
  let fixture: ComponentFixture<PipelineInferencingComponent>;
  let mockAppConfigService: Partial<AppConfigService>;
  let mockGraphService: Partial<GraphService>;
  let mockEdgeService: Partial<EdgeService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);
  mockGraphService = jasmine.createSpyObj(['getGatewayAndPipelines', 'getModels']);
  mockEdgeService = jasmine.createSpyObj(['getDevices']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineInferencingComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService },
        { provide: EdgeService, useValue: mockEdgeService }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineInferencingComponent);
    component = fixture.componentInstance;
    component.devices = [];
    component.modelForm = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create PipelineInferencingComponent', () => {
    expect(component).toBeTruthy();
  });
});
