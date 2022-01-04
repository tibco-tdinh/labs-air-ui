import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayEndpointComponent } from './iot-gateway-endpoint.component';

describe('IotGatewayEndpointComponent', () => {
  let component: IotGatewayEndpointComponent;
  let fixture: ComponentFixture<IotGatewayEndpointComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getReadings', 'getModels']);
  mockGraphService.getReadings.and.returnValue(of([]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IotGatewayEndpointComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
