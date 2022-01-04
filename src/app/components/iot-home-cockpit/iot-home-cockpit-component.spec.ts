import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IotHomeCockpitComponent } from './iot-home-cockpit.component';

describe('iot-home-cockpitComponent', () => {
    let component: IotHomeCockpitComponent;
    let fixture: ComponentFixture<IotHomeCockpitComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IotHomeCockpitComponent],
            imports: [RouterTestingModule.withRoutes([])]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IotHomeCockpitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
