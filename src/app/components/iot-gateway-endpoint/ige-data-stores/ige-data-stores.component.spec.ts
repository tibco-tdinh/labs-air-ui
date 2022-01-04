import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IgeDataStoresComponent } from './ige-data-stores.component';

describe('IgeDataStoresComponent', () => {
  let component: IgeDataStoresComponent;
  let fixture: ComponentFixture<IgeDataStoresComponent>;
  let mockGraphService;

  mockGraphService = jasmine.createSpyObj(['getDataStores']);

  mockGraphService.getDataStores.and.returnValue(of([]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IgeDataStoresComponent],
      imports: [AppModule],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
