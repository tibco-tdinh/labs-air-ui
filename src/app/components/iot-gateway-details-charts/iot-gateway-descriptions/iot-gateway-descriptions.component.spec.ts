import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayDescriptionsComponent } from './iot-gateway-descriptions.component';

describe('IotGatewayDescriptionsComponent', () => {
  let component: IotGatewayDescriptionsComponent;
  let fixture: ComponentFixture<IotGatewayDescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayDescriptionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayDescriptionsComponent);
    component = fixture.componentInstance;
    component.device = {} as Device;
    component.instrument = { properties: { value: {}, units: {}}} as Resource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
