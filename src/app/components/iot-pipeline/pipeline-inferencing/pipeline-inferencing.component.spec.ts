import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { PipelineInferencingComponent } from './pipeline-inferencing.component';

describe('PipelineInferencingComponent', () => {
  let component: PipelineInferencingComponent;
  let fixture: ComponentFixture<PipelineInferencingComponent>;
  let mockAppConfigService: Partial<AppConfigService>;
  let mockGraphService: Partial<GraphService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);
  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineInferencingComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineInferencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
