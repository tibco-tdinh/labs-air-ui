import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotEdgeDataPipelineComponent } from './iot-edge-data-pipeline.component';

describe('IotEdgeDataPipelineComponent', () => {
  let component: IotEdgeDataPipelineComponent;
  let fixture: ComponentFixture<IotEdgeDataPipelineComponent>;
  let mockAppConfigService: Partial<AppConfigService>;
  let mockGraphService;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);
  mockGraphService = jasmine.createSpyObj(['getGateway']);

  mockGraphService.getGateway.and.returnValue(of({

  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotEdgeDataPipelineComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotEdgeDataPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
