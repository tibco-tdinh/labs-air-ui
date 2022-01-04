import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IgeModelsComponent } from './ige-models.component';

describe('IgeModelsComponent', () => {
  let component: IgeModelsComponent;
  let fixture: ComponentFixture<IgeModelsComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getModels']);

  mockGraphService.getModels.and.returnValue(of({

  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IgeModelsComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgeModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
