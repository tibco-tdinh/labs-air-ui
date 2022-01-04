import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayTextComponent } from './iot-gateway-text.component';

describe('IotGatewayTextComponent', () => {
  let component: IotGatewayTextComponent;
  let fixture: ComponentFixture<IotGatewayTextComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayTextComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
