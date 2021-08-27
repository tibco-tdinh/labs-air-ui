import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotStoreSimulatorComponent } from './iot-store-simulator.component';

describe('IotStoreSimulator', () => {
  let component: IotStoreSimulatorComponent;
  let fixture: ComponentFixture<IotStoreSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotStoreSimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotStoreSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
