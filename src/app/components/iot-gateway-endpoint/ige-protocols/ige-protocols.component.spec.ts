import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IgeProtocolsComponent } from './ige-protocols.component';

describe('IgeProtocolsComponent', () => {
  let component: IgeProtocolsComponent;
  let fixture: ComponentFixture<IgeProtocolsComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getProtocols']);

  mockGraphService.getProtocols.and.returnValue(of({

  }));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IgeProtocolsComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgeProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
