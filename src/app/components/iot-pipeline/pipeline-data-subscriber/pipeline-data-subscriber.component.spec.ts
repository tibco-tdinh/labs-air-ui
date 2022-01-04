import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphService } from 'src/app/services/graph/graph.service';

import { PipelineDataSubscriberComponent } from './pipeline-data-subscriber.component';

describe('PipelineDataSubscriberComponent', () => {
  let component: PipelineDataSubscriberComponent;
  let fixture: ComponentFixture<PipelineDataSubscriberComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineDataSubscriberComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineDataSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
