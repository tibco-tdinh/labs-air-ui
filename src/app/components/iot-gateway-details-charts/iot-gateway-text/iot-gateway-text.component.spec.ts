import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EdgeService } from 'src/app/services/edge/edge.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayTextComponent } from './iot-gateway-text.component';

describe('IotGatewayTextComponent', () => {
    let component: IotGatewayTextComponent;
    let fixture: ComponentFixture<IotGatewayTextComponent>;

    const mockGraphService = jasmine.createSpyObj(['getReadings', 'getModels']);
    mockGraphService.getReadings.and.returnValue(of([]));
    const mockEdgeService = jasmine.createSpyObj(['getDevices']);

    mockGraphService.getReadings.and.returnValue(of([]));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IotGatewayTextComponent],
            providers: [
                { provide: GraphService, useValue: mockGraphService },
                { provide: EdgeService, useValue: mockEdgeService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IotGatewayTextComponent);
        component = fixture.componentInstance;
        component.device = {} as Device;
        component.instrument = { name: 'myName', properties: { value: {}, units: {} } } as Resource;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
