import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { InferencingComponent } from './inferencing.component';

describe('InferencingComponent', () => {
  let component: InferencingComponent;
  let fixture: ComponentFixture<InferencingComponent>;
  let mockAppConfigService: Partial<AppConfigService>;
  let mockGraphService: Partial<GraphService>;

  mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);
  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InferencingComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InferencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
