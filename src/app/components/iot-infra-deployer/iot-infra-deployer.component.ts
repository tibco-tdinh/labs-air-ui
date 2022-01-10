import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';



export interface SelectItem {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-iot-infra-deployer',
    templateUrl: './iot-infra-deployer.component.html',
    styleUrls: ['./iot-infra-deployer.component.css']
})
export class IotInfraDeployerComponent implements OnInit {

  // Form variables
  deployerForm: FormGroup;
  gatewayId = '';
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
      this.gatewayId = this.route.snapshot.paramMap.get('gatewayId');
  }


}
