import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs/breadcrumbs.service';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockBreadCrumbService;

  mockBreadCrumbService = jasmine.createSpyObj(['path']);

  mockBreadCrumbService.path = new BehaviorSubject<String[]>([]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: BreadcrumbsService, useValue: mockBreadCrumbService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
