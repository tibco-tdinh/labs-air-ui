import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayImageComponent } from './iot-gateway-image.component';

describe('IotGatewayImageComponent', () => {
  let component: IotGatewayImageComponent;
  let fixture: ComponentFixture<IotGatewayImageComponent>;
  let mockGraphService: Partial<GraphService>;

  mockGraphService = jasmine.createSpyObj(['xxx']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotGatewayImageComponent],
      providers: [
        { provide: GraphService, useValue: mockGraphService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotGatewayImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
