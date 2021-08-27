import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotTextileSimulatorComponent } from './iot-textile-simulator.component';

describe('IotSimulatorComponent', () => {
  let component: IotTextileSimulatorComponent;
  let fixture: ComponentFixture<IotTextileSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotTextileSimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotTextileSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
