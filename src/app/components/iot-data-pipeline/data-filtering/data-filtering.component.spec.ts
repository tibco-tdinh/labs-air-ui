import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { EdgeService } from 'src/app/services/edge/edge.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { DataFilteringComponent } from './data-filtering.component';

describe('DataFilteringComponent', () => {
  let component: DataFilteringComponent;
  let fixture: ComponentFixture<DataFilteringComponent>;
  let mockGraphService;
  let mockEdgeService: Partial<EdgeService>;

  mockGraphService = jasmine.createSpyObj(['getGatewayAndPipelines']);
  mockEdgeService = jasmine.createSpyObj(['xxx']);

  mockGraphService.getGatewayAndPipelines.and.returnValue(of([]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataFilteringComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService },
        { provide: EdgeService, useValue: mockEdgeService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
