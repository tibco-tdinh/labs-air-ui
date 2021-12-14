import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraRegistrationComponent } from './infra-registration.component';

describe('InfraRegistrationComponent', () => {
  let component: InfraRegistrationComponent;
  let fixture: ComponentFixture<InfraRegistrationComponent>;
  let reg:DebugElement = new DebugElement();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have custom propeties', () => {
  //   fixture.detectChanges();
  //   expect(name.name).toEqual('Custom Properties');
  // });
  it('should have "Registration" button disabled', () => {
    reg = fixture.debugElement;
    expect(reg.nativeElement.querySelector('#registrationButton').disabled).toBeTruthy();
  });

});
