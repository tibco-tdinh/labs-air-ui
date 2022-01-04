import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeService, } from 'rete-angular-render-plugin';

import { NodePrimaryComponent } from './node-primary.component';

describe('NodePrimaryComponent', () => {
  let component: NodePrimaryComponent;
  let fixture: ComponentFixture<NodePrimaryComponent>;
  let mockNodeService: Partial<NodeService>;

  mockNodeService = jasmine.createSpyObj(['setBindings']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NodePrimaryComponent],
      providers: [
        { provide: NodeService, useValue: mockNodeService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodePrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
