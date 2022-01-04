import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppConfigService } from 'src/app/services/config/app-config.service';

import { InfraDeployerComponent } from './infra-deployer.component';

describe('InfraDeployerComponent', () => {
  let component: InfraDeployerComponent;
  let fixture: ComponentFixture<InfraDeployerComponent>;
  let mockAppConfigService: Partial<AppConfigService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfraDeployerComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraDeployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
