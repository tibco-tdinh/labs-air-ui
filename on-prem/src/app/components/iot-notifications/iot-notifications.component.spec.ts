import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { GraphService } from 'src/app/services/graph/graph.service';

import { IotNotificationsComponent } from './iot-notifications.component';

describe('IotNotificationsComponent', () => {
    let component: IotNotificationsComponent;
    let fixture: ComponentFixture<IotNotificationsComponent>;
    const mockGraphService = jasmine.createSpyObj(['getNotifications', 'getModels']);

    mockGraphService.getNotifications.and.returnValue(of({

    }));

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ IotNotificationsComponent ],
            providers: [
                { provide: GraphService, useValue: mockGraphService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IotNotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
