import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { EdgeService } from 'src/app/services/edge/edge.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { InfraDeployerComponent } from './infra-deployer.component';

describe('InfraDeployerComponent', () => {
    let component: InfraDeployerComponent;
    let fixture: ComponentFixture<InfraDeployerComponent>;

    const mockAppConfigService: Partial<AppConfigService> = jasmine.createSpyObj(['getFromConfigOrEnv', 'loadAppConfig']);
    const mockEdgeService: Partial<EdgeService> = jasmine.createSpyObj(['getDevices']);
    const mockGraphService = jasmine.createSpyObj(['getGateways', 'getGatewayAndPipelines', 'getModels']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InfraDeployerComponent],
            imports: [HttpClientTestingModule, AppModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: AppConfigService, useValue: mockAppConfigService },
                { provide: EdgeService, useValue: mockEdgeService },
                { provide: GraphService, useValue: mockGraphService }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InfraDeployerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create it', () => {
        expect(component).toBeTruthy();
    });
});
