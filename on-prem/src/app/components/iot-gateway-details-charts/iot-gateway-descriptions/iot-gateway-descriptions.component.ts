import { Component, Input } from '@angular/core';
import { Device, Resource } from 'src/app/shared/models/iot.model';

@Component({
    selector: 'app-iot-gateway-descriptions',
    templateUrl: './iot-gateway-descriptions.component.html',
    styleUrls: ['./iot-gateway-descriptions.component.css']
})
export class IotGatewayDescriptionsComponent {
  @Input() device: Device;
  @Input() instrument: Resource;

  constructor() { }

}
