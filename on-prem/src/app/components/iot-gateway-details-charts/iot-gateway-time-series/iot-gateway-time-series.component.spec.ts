import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayTimeSeriesComponent } from './iot-gateway-time-series.component';

describe('IotGatewayTimeSeriesComponent', () => {
    let component: IotGatewayTimeSeriesComponent;
    let fixture: ComponentFixture<IotGatewayTimeSeriesComponent>;
    const mockGraphService = jasmine.createSpyObj(['getReadings', 'getModels']);
    mockGraphService.getReadings.and.returnValue(of([]));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IotGatewayTimeSeriesComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: GraphService, useValue: mockGraphService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IotGatewayTimeSeriesComponent);
        component = fixture.componentInstance;
        component.device = {} as Device;
        component.instrument = { properties: { units: {}}} as Resource;;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
