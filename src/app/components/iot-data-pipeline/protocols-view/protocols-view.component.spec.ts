import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GraphService } from 'src/app/services/graph/graph.service';

import { ProtocolsViewComponent } from './protocols-view.component';

describe('ProtocolsViewComponent', () => {
  let component: ProtocolsViewComponent;
  let fixture: ComponentFixture<ProtocolsViewComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProtocolsViewComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
