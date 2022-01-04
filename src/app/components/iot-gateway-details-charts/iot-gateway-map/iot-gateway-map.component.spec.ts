import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayMapComponent } from './iot-gateway-map.component';

describe('IotGatewayMapComponent', () => {
  let component: IotGatewayMapComponent;
  let fixture: ComponentFixture<IotGatewayMapComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getReadings', 'getGateways', 'getGatewayAndPipelines', 'getModels']);
  mockGraphService.getReadings.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayMapComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayMapComponent);
    component = fixture.componentInstance;
    component.device = {} as Device;
    component.instrument = { properties: { value: {}, units: {} } } as Resource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
