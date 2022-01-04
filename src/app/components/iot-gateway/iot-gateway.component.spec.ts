import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayComponent } from './iot-gateway.component';

describe('IotGatewayComponent', () => {
  let component: IotGatewayComponent;
  let fixture: ComponentFixture<IotGatewayComponent>;
  let mockGraphService: Partial<GraphService>;
  let mockAppConfigService: Partial<AppConfigService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);
  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IotGatewayComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
