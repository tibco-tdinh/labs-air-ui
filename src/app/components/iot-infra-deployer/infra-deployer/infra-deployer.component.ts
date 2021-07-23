import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SelectItem } from '../iot-infra-deployer.component';
import {MatTableModule} from '@angular/material/table'
import { DateFormat } from 'ng2-google-charts/lib/google-charts-datatable';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';


export interface NVP{
  name: string;
  value: string;

}



export interface Projects {
  name: string;
  id: number;
  description: string;
  created: String;
  deployables: string[];
}


export interface Deployable {
  name: string;
  properties: string[];
}

export interface BuildOperation {

}

export interface DeployOperation {
  DeployConstrains: string;
  Deployable: string;
  Method: string;
  NoF1Descriptor: string;
  Platform: string;
  ServiceProperties: string;
  ServiceType: string;
  TargetServer: string;
  Username:string;
}

export interface UndeployOperation{
  Deployable: string;
  Method: string;
  NoF1Descriptor: string;
  Platform: string;
  ServiceType: string;
  TargetServer: string;
  Username:string;
}
export interface Operations {
  Build: BuildOperation;
  Deploy: DeployOperation;
  Undeploy: UndeployOperation;
}

export interface DeployableProjects {
  Name: string;
  Description: string;
  Created: string;
  Parameter: Operations;
  Deployables: Deployable[];
}

const PROJECT_DATA: Projects[] = [
  {id: 1, name: 'package1', description: 'camera', created: '1/20/2021', deployables:
  [ "EDGEX_CORE_CONSUL","EDGEX_CORE_DATA_HOST",
    "EDGEX_SUPPORT_NOTIFICATIONS",
    "EDGEX_CORE_METADATA",
    "EDGEX_CORE_COMMAND",
    "EDGEX_SUPPORT_SCHDELER",
    "EDGEX_DEVICE_VIRTUAL",
    "EDGEX_REDIS"]},
  {id: 2, name: 'package2', description: 'object', created: '07/20/2021', deployables:
  [ "EDGEX_CORE_CONSUL","EDGEX_CORE_DATA_HOST",
    "EDGEX_SUPPORT_NOTIFICATIONS",
    "EDGEX_CORE_METADATA",
    "EDGEX_CORE_COMMAND",
    "EDGEX_SUPPORT_SCHDELER",
    "EDGEX_DEVICE_VIRTUAL",
    "EDGEX_REDIS"]},
  {id: 3, name: 'package3', description: 'box', created: '07/21/2021',deployables:
  [ "EDGEX_CORE_CONSUL","EDGEX_CORE_DATA_HOST",
    "EDGEX_SUPPORT_NOTIFICATIONS",
    "EDGEX_CORE_METADATA",
    "EDGEX_CORE_COMMAND",
    "EDGEX_SUPPORT_SCHDELER",
    "EDGEX_DEVICE_VIRTUAL",
    "EDGEX_REDIS"]},
];

@Component({
  selector: 'app-infra-deployer',
  templateUrl: './infra-deployer.component.html',
  styleUrls: ['./infra-deployer.component.css']
})
export class InfraDeployerComponent implements OnInit {
  dateFormat = 'yyyy-MM-dd  HH:mm:ss'
  displayedColumns: string[] = ['id', 'name', 'description', 'created'];
  dataSource = PROJECT_DATA;
  projectForm: FormGroup;

  selectedRowIndex=-1;
  selectedRowName= "";
  selectedRowDescription= ""
  selectedRowCreated= ""
  selectedRowDeployable =[]
  constructor(private fb: FormBuilder) { }
  

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      details: this.fb.array([])
    });

  }
  get detailForms(){
    return this.projectForm.get('details') as FormArray
  }
  addDetail(projectId, projectName, projectDescription, projectCreated){
    const detail = this.fb.group({
      id: projectId,
      name: projectName,
      description: projectDescription,
      created: projectCreated,
      // deployables: ["1","2"]
    })
    this.detailForms.removeAt(0);
    this.detailForms.push(detail)
  }

  highlight(row){
    this.selectedRowIndex = row.id;
    this.selectedRowName = row.name;
    this.selectedRowCreated =row.created;
    this.selectedRowDescription=row.description;
    this.addDetail(this.selectedRowIndex,this.selectedRowName,this.selectedRowCreated,this.selectedRowDescription)    
 
    }
    undeploy() {}
    deploy(){}
}
