import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayComponent } from './iot-gateway.component';

describe('IotGatewayComponent', () => {
  let component: IotGatewayComponent;
  let fixture: ComponentFixture<IotGatewayComponent>;
  let mockGraphService;
  let mockAppConfigService: Partial<AppConfigService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv', 'loadAppConfig']);
  mockGraphService = jasmine.createSpyObj(['getGateways', 'getGatewayAndPipelines', 'getModels']);

  mockGraphService.getGateways.and.returnValue(of([]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IotGatewayComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule, AppModule],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayComponent);
    component = fixture.componentInstance;
    component.gatewayForm = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
