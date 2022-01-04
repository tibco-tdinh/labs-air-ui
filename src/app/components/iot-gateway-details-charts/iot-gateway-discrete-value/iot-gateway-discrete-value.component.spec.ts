import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayDiscreteValueComponent } from './iot-gateway-discrete-value.component';

describe('IotGatewayDiscreteValueComponent', () => {
  let component: IotGatewayDiscreteValueComponent;
  let fixture: ComponentFixture<IotGatewayDiscreteValueComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getReadings', 'getModels']);
  mockGraphService.getReadings.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayDiscreteValueComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayDiscreteValueComponent);
    component = fixture.componentInstance;
    component.device = {} as Device;
    component.instrument = {} as Resource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
