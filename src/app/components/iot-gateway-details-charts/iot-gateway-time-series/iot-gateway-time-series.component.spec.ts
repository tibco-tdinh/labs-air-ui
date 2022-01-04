import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayTimeSeriesComponent } from './iot-gateway-time-series.component';

describe('IotGatewayTimeSeriesComponent', () => {
  let component: IotGatewayTimeSeriesComponent;
  let fixture: ComponentFixture<IotGatewayTimeSeriesComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayTimeSeriesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayTimeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
