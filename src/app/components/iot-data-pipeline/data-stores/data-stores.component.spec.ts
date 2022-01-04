import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GraphService } from 'src/app/services/graph/graph.service';

import { DataStoresComponent } from './data-stores.component';

describe('DataStoresComponent', () => {
  let component: DataStoresComponent;
  let fixture: ComponentFixture<DataStoresComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataStoresComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
