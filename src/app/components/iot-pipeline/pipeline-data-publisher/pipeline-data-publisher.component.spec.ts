import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { EdgeService } from 'src/app/services/edge/edge.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { PipelineDataPublisherComponent } from './pipeline-data-publisher.component';

describe('PipelineDataPublisherComponent', () => {
  let component: PipelineDataPublisherComponent;
  let fixture: ComponentFixture<PipelineDataPublisherComponent>;
  let mockGraphService;
  let mockEdgeService: Partial<EdgeService>;

  mockGraphService = jasmine.createSpyObj(['getProtocols']);
  mockEdgeService = jasmine.createSpyObj(['getDevices']);

  mockGraphService.getProtocols.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineDataPublisherComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService },
        { provide: EdgeService, useValue: mockEdgeService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineDataPublisherComponent);
    component = fixture.componentInstance;
    component.dataPublisherForm = new FormGroup({});
    component.dataPublisherForm.addControl('gateway', new FormControl(''));
    component.dataPublisherForm.addControl('protocolId', new FormControl(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
