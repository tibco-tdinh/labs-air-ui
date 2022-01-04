import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayMapComponent } from './iot-gateway-map.component';

describe('IotGatewayMapComponent', () => {
  let component: IotGatewayMapComponent;
  let fixture: ComponentFixture<IotGatewayMapComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayMapComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
