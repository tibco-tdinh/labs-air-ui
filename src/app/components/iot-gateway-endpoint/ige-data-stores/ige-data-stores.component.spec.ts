import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IgeDataStoresComponent } from './ige-data-stores.component';

describe('IgeDataStoresComponent', () => {
  let component: IgeDataStoresComponent;
  let fixture: ComponentFixture<IgeDataStoresComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getDataStores']);

  mockGraphService.getDataStores.and.returnValue(of({

  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IgeDataStoresComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgeDataStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
