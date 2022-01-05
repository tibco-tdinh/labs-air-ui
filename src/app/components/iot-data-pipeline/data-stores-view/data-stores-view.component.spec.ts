import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { DataStoresViewComponent } from './data-stores-view.component';

describe('DataStoresViewComponent', () => {
    let component: DataStoresViewComponent;
    let fixture: ComponentFixture<DataStoresViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DataStoresViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataStoresViewComponent);
        component = fixture.componentInstance;
        component.dataStoreForm = new FormGroup({});
        component.dataStoreForm.addControl('dataStore', new FormControl(''));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
