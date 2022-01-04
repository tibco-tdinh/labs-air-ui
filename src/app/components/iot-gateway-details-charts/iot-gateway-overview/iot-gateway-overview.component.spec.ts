import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayOverviewComponent } from './iot-gateway-overview.component';

describe('IotGatewayOverviewComponent', () => {
  let component: IotGatewayOverviewComponent;
  let fixture: ComponentFixture<IotGatewayOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayOverviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayOverviewComponent);
    component = fixture.componentInstance;
    component.device = {} as Device;
    component.instrument = {} as Resource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
