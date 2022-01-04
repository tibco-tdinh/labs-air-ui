import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { EdgeService } from 'src/app/services/edge/edge.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { PipelineRuleExpressionComponent } from './pipeline-rule-expression.component';

describe('PipelineRuleExpressionComponent', () => {
  let component: PipelineRuleExpressionComponent;
  let fixture: ComponentFixture<PipelineRuleExpressionComponent>;
  let mockGraphService;
  let mockEdgeService: Partial<EdgeService>;

  mockGraphService = jasmine.createSpyObj(['getGatewayAndPipelines', 'addPipeline']);
  mockEdgeService = jasmine.createSpyObj(['xxx']);

  mockGraphService.getGatewayAndPipelines.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineRuleExpressionComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService },
        { provide: EdgeService, useValue: mockEdgeService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineRuleExpressionComponent);
    component = fixture.componentInstance;
    component.ruleExpressionForm = new FormGroup({});
    component.ruleExpressionForm.addControl('device', new FormControl(''));
    component.devices = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
