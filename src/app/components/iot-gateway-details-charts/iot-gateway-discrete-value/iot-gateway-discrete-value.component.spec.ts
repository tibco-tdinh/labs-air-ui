import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayDiscreteValueComponent } from './iot-gateway-discrete-value.component';

describe('IotGatewayDiscreteValueComponent', () => {
  let component: IotGatewayDiscreteValueComponent;
  let fixture: ComponentFixture<IotGatewayDiscreteValueComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayDiscreteValueComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayDiscreteValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
