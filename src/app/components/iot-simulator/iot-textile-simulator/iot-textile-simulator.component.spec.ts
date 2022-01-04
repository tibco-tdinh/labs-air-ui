import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { TextileSimulatorService } from 'src/app/services/simulator/textile-simulator.service';

import { IotTextileSimulatorComponent } from './iot-textile-simulator.component';

describe('IotSimulatorComponent', () => {
  let component: IotTextileSimulatorComponent;
  let fixture: ComponentFixture<IotTextileSimulatorComponent>;
  let mockAppConfigService: Partial<AppConfigService>;
  let mockSimulatorService: Partial<TextileSimulatorService>;
  let mockGraphService: Partial<GraphService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);
  mockSimulatorService = jasmine.createSpyObj(['getProducts', 'subscribe']);
  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotTextileSimulatorComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TextileSimulatorService, useValue: mockSimulatorService },
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotTextileSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
