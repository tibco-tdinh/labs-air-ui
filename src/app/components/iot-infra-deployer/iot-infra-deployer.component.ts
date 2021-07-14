import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { GraphService } from '../../services/graph/graph.service';
import { FlogoDeployService } from '../../services/deployment/flogo-deploy.service';
import { Gateway } from '../../shared/models/iot.model';

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

  gatewayId = "";
  gateway = null as Gateway;
  deployerForm: FormGroup;

  deployerTypes: SelectItem[] = [
    { value: 'AIR', viewValue: 'AIR Deployer' },
    { value: 'OH', viewValue: 'OpenHorizon' }
  ];

  constructor(private graphService: GraphService,
    private flogoDeployService: FlogoDeployService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { 

    }

  ngOnInit(): void {
    // Get gateway id from route
    this.gatewayId = this.route.snapshot.paramMap.get('gatewayId');

    this.getGatewayDetails(this.gatewayId);

  }

  /**
   * Get Gateway, Pipelines and Devices information
   */
   public getGatewayDetails(gatewayId: string) {
    console.log("Getting gateway and pipelines for: ", gatewayId);

    this.graphService.getGatewayAndPipelines(gatewayId)
      .subscribe(res => {
        console.log("Received response for graphService.getGatewayAndPipelines: ", res);
        this.gateway = res[0] as Gateway;


      })
  }

  createForm() {

    this.deployerForm = this.formBuilder.group({
      deployerType: ['', Validators.required],
      deployEdgex: [true, Validators.required],
      deployAIRBase: [true, Validators.required],
    });

  }

  deploy() {

  }

  undeploy() {

  }

}
