import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayLocationComponent } from './iot-gateway-location.component';

describe('IotGatewayLocationComponent', () => {
    let component: IotGatewayLocationComponent;
    let fixture: ComponentFixture<IotGatewayLocationComponent>;
    const mockGraphService = jasmine.createSpyObj(['getReadings', 'getModels']);
    mockGraphService.getReadings.and.returnValue(of([]));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IotGatewayLocationComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: GraphService, useValue: mockGraphService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IotGatewayLocationComponent);
        component = fixture.componentInstance;
        component.device = {} as Device;
        component.instrument = { properties: { value: {}, units: {}}} as Resource;
        component.instrumentForm = new FormGroup({});
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
