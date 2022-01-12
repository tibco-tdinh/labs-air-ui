import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfigService } from 'src/app/services/config/app-config.service';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotGatewayDetailsComponent } from './iot-gateway-details.component';

describe('IotGatewayDetailsComponent', () => {
    let component: IotGatewayDetailsComponent;
    let fixture: ComponentFixture<IotGatewayDetailsComponent>;

    const mockAppConfigService: Partial<AppConfigService> = jasmine.createSpyObj(['getFromConfigOrEnv']);
    const mockGraphService: Partial<GraphService> = jasmine.createSpyObj(['xxx']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IotGatewayDetailsComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                { provide: AppConfigService, useValue: mockAppConfigService },
                { provide: GraphService, useValue: mockGraphService }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IotGatewayDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
