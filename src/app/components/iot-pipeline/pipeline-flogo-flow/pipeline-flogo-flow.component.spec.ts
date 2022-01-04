import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppConfigService } from 'src/app/services/config/app-config.service';

import { PipelineFlogoFlowComponent } from './pipeline-flogo-flow.component';

describe('PipelineFlogoFlowComponent', () => {
  let component: PipelineFlogoFlowComponent;
  let fixture: ComponentFixture<PipelineFlogoFlowComponent>;
  let mockAppConfigService: Partial<AppConfigService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineFlogoFlowComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, ReactiveFormsModule, MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineFlogoFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
