import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayXyzValueComponent } from './iot-gateway-xyz-value.component';

describe('IotGatewayXyzValueComponent', () => {
  let component: IotGatewayXyzValueComponent;
  let fixture: ComponentFixture<IotGatewayXyzValueComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getReadings']);
  mockGraphService.getReadings.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayXyzValueComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayXyzValueComponent);
    component = fixture.componentInstance;
    component.device = {} as Device;
    component.instrument = { properties: { value: {}, units: {} } } as Resource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
