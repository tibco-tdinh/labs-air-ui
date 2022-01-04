import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotDataPipelineComponent } from './iot-data-pipeline.component';

describe('IotDataPipelineComponent', () => {
  let component: IotDataPipelineComponent;
  let fixture: ComponentFixture<IotDataPipelineComponent>;
  let mockGraphService;
  let mockAppConfigService: Partial<AppConfigService>;

  mockGraphService = jasmine.createSpyObj(['getGatewayAndPipelines']);
  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);

  mockGraphService.getGatewayAndPipelines.and.returnValue(of({

  }));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IotDataPipelineComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDataPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
