import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IotInfraDeployerComponent } from './iot-infra-deployer.component';

describe('IotInfraDeployerComponent', () => {
  let component: IotInfraDeployerComponent;
  let fixture: ComponentFixture<IotInfraDeployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IotInfraDeployerComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotInfraDeployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
