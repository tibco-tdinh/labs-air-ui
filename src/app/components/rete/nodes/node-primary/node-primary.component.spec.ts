import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeService } from 'rete-angular-render-plugin';
import { Node, NodeEditor } from 'rete';

import { NodePrimaryComponent } from './node-primary.component';
import { EdgeService } from 'src/app/services/edge/edge.service';

describe('NodePrimaryComponent', () => {
  let component: NodePrimaryComponent;
  let fixture: ComponentFixture<NodePrimaryComponent>;
  let mockNodeService: Partial<NodeService>;
  let mockEdgeService;

  mockNodeService = jasmine.createSpyObj(['setBindings']);
  mockEdgeService = jasmine.createSpyObj(['getDevices']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NodePrimaryComponent],
      providers: [
        { provide: NodeService, useValue: mockNodeService },
        { provide: EdgeService, useValue: mockEdgeService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodePrimaryComponent);
    component = fixture.componentInstance;
    component.node = new Node('test');
    const container: HTMLElement = document.createElement("div");
    component.editor = new NodeEditor('testing@0.1.0', container);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
