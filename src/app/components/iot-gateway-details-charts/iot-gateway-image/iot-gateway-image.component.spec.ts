import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EdgeService } from 'src/app/services/edge/edge.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Device, Resource } from 'src/app/shared/models/iot.model';

import { IotGatewayImageComponent } from './iot-gateway-image.component';

describe('IotGatewayImageComponent', () => {
    let component: IotGatewayImageComponent;
    let fixture: ComponentFixture<IotGatewayImageComponent>;
    const mockGraphService = jasmine.createSpyObj(['getReadings', 'getModels']);
    const mockEdgeService: Partial<EdgeService> = jasmine.createSpyObj(['xxx']);

    mockGraphService.getReadings.and.returnValue(of([]));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IotGatewayImageComponent],
            providers: [
                { provide: GraphService, useValue: mockGraphService },
                { provide: EdgeService, useValue: mockEdgeService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IotGatewayImageComponent);
        component = fixture.componentInstance;
        component.device = { name: '' } as Device;
        component.instrument = {} as Resource;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
