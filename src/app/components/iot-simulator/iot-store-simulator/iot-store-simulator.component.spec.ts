import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { RtsfSimulatorService } from 'src/app/services/simulator/rtsf-simulator.service';

import { IotStoreSimulatorComponent } from './iot-store-simulator.component';

describe('IotStoreSimulator', () => {
  let component: IotStoreSimulatorComponent;
  let fixture: ComponentFixture<IotStoreSimulatorComponent>;
  let mockAppConfigService: Partial<AppConfigService>;
  let mockSimulatorService;
  let mockGraphService;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);
  mockSimulatorService = jasmine.createSpyObj(['getProducts', 'subscribe']);
  mockGraphService = jasmine.createSpyObj(['getNotifications']);

  mockSimulatorService.getProducts.and.returnValue(of({

  }));

  mockGraphService.getNotifications.and.returnValue(of({

  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotStoreSimulatorComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: RtsfSimulatorService, useValue: mockSimulatorService },
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotStoreSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
