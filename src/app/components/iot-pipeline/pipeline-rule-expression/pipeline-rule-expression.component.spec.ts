import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { PipelineRuleExpressionComponent } from './pipeline-rule-expression.component';

describe('PipelineRuleExpressionComponent', () => {
  let component: PipelineRuleExpressionComponent;
  let fixture: ComponentFixture<PipelineRuleExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelineRuleExpressionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineRuleExpressionComponent);
    component = fixture.componentInstance;
    component.ruleExpressionForm = new FormGroup({});
    component.ruleExpressionForm.addControl('device', new FormControl(''));
    component.devices = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
