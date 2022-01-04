import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayLocationComponent } from './iot-gateway-location.component';

describe('IotGatewayLocationComponent', () => {
  let component: IotGatewayLocationComponent;
  let fixture: ComponentFixture<IotGatewayLocationComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayLocationComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
