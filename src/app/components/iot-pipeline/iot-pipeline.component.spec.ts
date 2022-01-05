import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { EdgeService } from 'src/app/services/edge/edge.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { Gateway } from 'src/app/shared/models/iot.model';

import { IotPipelineComponent } from './iot-pipeline.component';

describe('IotPipelineComponent', () => {
    let component: IotPipelineComponent;
    let fixture: ComponentFixture<IotPipelineComponent>;

    const mockAppConfigService = jasmine.createSpyObj(['getFromConfigOrEnv']);
    const mockGraphService = jasmine.createSpyObj(['getGateways', 'getGatewayAndPipelines', 'getModels']);
    const mockEdgeService: Partial<EdgeService> = jasmine.createSpyObj(['getDevices']);

    mockGraphService.getGatewayAndPipelines.and.returnValue(of([new Gateway()] as Gateway[]));
    mockGraphService.getModels.and.returnValue(of([]));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IotPipelineComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule],
            providers: [
                { provide: AppConfigService, useValue: mockAppConfigService },
                { provide: GraphService, useValue: mockGraphService },
                { provide: EdgeService, useValue: mockEdgeService }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IotPipelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
