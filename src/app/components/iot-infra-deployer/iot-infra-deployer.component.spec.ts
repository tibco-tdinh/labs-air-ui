import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotInfraDeployerComponent } from './iot-infra-deployer.component';

describe('IotInfraDeployerComponent', () => {
  let component: IotInfraDeployerComponent;
  let fixture: ComponentFixture<IotInfraDeployerComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getGateways', 'getGatewayAndPipelines']);

  mockGraphService.getGateways.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotInfraDeployerComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotInfraDeployerComponent);
    component = fixture.componentInstance;
    component.deployerForm = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
