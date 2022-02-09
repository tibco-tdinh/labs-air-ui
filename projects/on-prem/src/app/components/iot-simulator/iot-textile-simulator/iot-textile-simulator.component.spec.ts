import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppConfigService } from '../../../services/config/app-config.service';
import { EdgeService } from '../../../services/edge/edge.service';
import { GraphService } from '../../../services/graph/graph.service';
import { TextileSimulatorService } from '../../../services/simulator/textile-simulator.service';

import { IotTextileSimulatorComponent } from './iot-textile-simulator.component';

describe('IotSimulatorComponent', () => {
    let component: IotTextileSimulatorComponent;
    let fixture: ComponentFixture<IotTextileSimulatorComponent>;

    const mockAppConfigService: Partial<AppConfigService> = jasmine.createSpyObj(['getFromConfigOrEnv']);
    const mockSimulatorService: Partial<TextileSimulatorService> = jasmine.createSpyObj(['getProducts', 'subscribe']);
    const mockGraphService: Partial<GraphService> = jasmine.createSpyObj(['getModels']);
    const mockEdgeService: Partial<EdgeService> = jasmine.createSpyObj(['xxx']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IotTextileSimulatorComponent],
            imports: [HttpClientTestingModule, MatSnackBarModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: TextileSimulatorService, useValue: mockSimulatorService },
                { provide: AppConfigService, useValue: mockAppConfigService },
                { provide: GraphService, useValue: mockGraphService },
                { provide: EdgeService, useValue: mockEdgeService }
            ]
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
