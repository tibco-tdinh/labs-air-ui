import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FlogoDeployService } from 'src/app/services/deployment/flogo-deploy.service';



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
  Username: string;
}

export interface UndeployOperation {
  Deployable: string;
  Method: string;
  NoF1Descriptor: string;
  Platform: string;
  ServiceType: string;
  TargetServer: string;
  Username: string;
}
export interface Operations {
  build: BuildOperation;
  deploy: DeployOperation;
  undeploy: UndeployOperation;
}


export interface Deployable {
  id: string;
  name: string;
  parameters: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  created: string;
  Deployables: Deployable[];
  parameter: Operations;
}

interface FlattenedDeployable {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectCreated: string;
  parameters: string[];
  operations: Operations;

}

@Component({
  selector: 'app-infra-deployer',
  templateUrl: './infra-deployer.component.html',
  styleUrls: ['./infra-deployer.component.css']
})
export class InfraDeployerComponent implements OnInit {

  dateFormat = 'yyyy-MM-dd  HH:mm:ss'

  dataSource = new MatTableDataSource<FlattenedDeployable>();
  deployablesData: FlattenedDeployable[] = [];

  displayedColumns = ['id', 'name', 'projid', 'projname', 'projdescription', 'projcreated','action'];
  deployableSelection = new SelectionModel<FlattenedDeployable>(false, []);
  deployableForm: FormGroup;


  constructor(private flogoDeployService: FlogoDeployService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    this.deployableSelection.clear();

    this.createForm();
/*
get the projects for the deployable table
*/
    this.getProjects();
  }


  createForm() {
    console.log("Creating form");
    this.deployableForm = this.formBuilder.group({
      deployConstraints: ['', Validators.required],
      deployable: ['', Validators.required],
      method: ['', Validators.required],
      noF1Descriptor: ['', Validators.required],
      platform: ['', Validators.required],
      serviceProperties: ['', Validators.required],
      serviceType: ['', Validators.required],
      targetServer: ['', Validators.required],
      username: ['', Validators.required],
      parameters: this.formBuilder.array([],Validators.required)
    });

    console.log("Created form")
  }

  createParameter(name, value): FormGroup {
    console.log("Creating form with param name: ", name);
    
    return this.formBuilder.group({
      name: [name, Validators.required],
      value: [value, Validators.required]
    });
  }

  getParameters(): FormArray {
    return <FormArray> this.deployableForm.get('parameters');
  }

  addParameterItem(name, value) {
    this.getParameters().push(this.createParameter(name, value));
  }

  getProjects() {
    console.log("Getting projects");

    this.deployablesData = [];

    this.flogoDeployService.getProjects()
      .subscribe(res => {
        console.log("Received response for flogoDeployService.getProjects: ", res);

        let projects = res.DataOut.Projects;

        projects.forEach(project => {

          console.log("Iterated Project: ", project);

          project.Deployables.forEach(deployable => {


            this.deployablesData.push({
              id: deployable.id,
              name: deployable.name,
              projectId: project.id,
              projectName: project.name,
              projectDescription: project.description,
              projectCreated: project.created,
              parameters: deployable.parameters,
              operations: project.parameter
            });

          });

        });

        console.log("FlattenedData: ", this.deployablesData);
        this.dataSource = new MatTableDataSource(this.deployablesData);


        // this.projectsDataSource.sort = this.sort;

      })


  }

  /*
  show the row values
  */
  deployableSelected(row) {

    console.log("Row selected: ", row);

    this.deployableSelection.select(row);

    // Update form

    this.getParameters().clear();


    for (const property in row.parameters) {
      this.addParameterItem(`${property}`, `${row.parameters[property]}`)
    }

    this.deployableForm.patchValue({
      deployConstraints: row.operations.deploy.DeployConstrains,
      deployable: row.operations.deploy.Deployable,
      method: row.operations.deploy.Method,
      noF1Descriptor: row.operations.deploy.NoF1Descriptor,
      platform: row.operations.deploy.Platform,
      serviceProperties: row.operations.deploy.ServiceProperties,
      serviceType: row.operations.deploy.ServiceType,
      targetServer: row.operations.deploy.TargetServer,
      username: row.operations.deploy.Username,
    });


  }

  deploy() {

    let deployerType = 'OH';

    let systemEnv = {
      "TargetServer": this.deployableForm.get('targetServer').value,
      "Username": this.deployableForm.get('username').value,
      "Artifacts": "/home/ubuntu/loss-detection-app",
      "Platform": this.deployableForm.get('platform').value,
      "DeployConstrains": this.deployableForm.get('deployConstraints').value,
      "ServiceProperties": this.deployableForm.get('serviceProperties').value,
    };
    
    // Build dynamic parameters
    let parameters = this.getParameters();
    let numParams = parameters.length;

    for (var i = 0; i < numParams; i++) {

      let control = parameters.at(i)

      let paramName = control.get('name').value;
      let paramValue = control.get('value').value;

      console.log("Param: ", paramName, " Value: ", paramValue);
      systemEnv[paramName] = paramValue;
    }


    let deployRequest = {

      "Method": this.deployableForm.get('method').value,
      "NoF1Descriptor": this.deployableForm.get('noF1Descriptor').value,
      "ScriptSystemEnv": systemEnv,
      "UserDefinedParameters": {}
    };

    console.log("DeployRequest: ", deployRequest);
    console.log("Deploy Request string: ", JSON.stringify(deployRequest));
    
    this.flogoDeployService.deployInfra(deployRequest)
      .subscribe(res => {
        console.log("Received Deployment response: ", res);

        let message = 'Success';
        if (res == undefined || res.Success == false) {
          message = 'Failure';
        }

        this._snackBar.open(message, "Deploy Infrastructure", {
          duration: 3000,
        });

      });

  }

  /*
  delete project
  */

  delete(description, id){
    let deleteRequest = {
      "Description": description,
       "IDs" : [id]
      };
      console.log("description",deleteRequest);
      this.flogoDeployService.deleteInfra(deleteRequest)
      .subscribe(res => {
        console.log("Received deletion response: ", res);

        let message = 'Success';
        if (res == undefined || res.Success == false) {
          message = 'Failure';
        }

        this._snackBar.open(message, "project deletion", {
          duration: 3000,
        });
        this.getProjects();

      });

  }
  // http://localhost:8043/http://52.22.89.56:5408/f1/projectmgr/file/create/project/air11
  /*
  undeploy project
  */
  undeploy() { 
    // let systemEnv = {
    //   "TargetServer": this.deployableForm.get('targetServer').value,
    //   "Username": this.deployableForm.get('username').value,
    //   "Artifacts": "/home/ubuntu/loss-detection-app",
    //   "Platform": this.deployableForm.get('platform').value,
    //   "DeployConstrains": this.deployableForm.get('deployConstraints').value,
    //   "ServiceProperties": this.deployableForm.get('serviceProperties').value,
    // };

    // let undeployRequest = {

    //   "Method": "Script",
    //   "NoF1Descriptor": true,
    //   "ScriptSystemEnv": systemEnv,
    //   "UserDefinedParameters": {}
    // };

    // console.log("UndeployRequest: ", undeployRequest);

    // this.flogoDeployService.undeployInfra(undeployRequest)
    //   .subscribe(res => {
    //     console.log("Received Undeploy response: ", res);

    //     let message = 'Success';
    //     if (res == undefined || res.Success == false) {
    //       message = 'Failure';
    //     }

    //     this._snackBar.open(message, "Undeploy Infra", {
    //       duration: 3000,
    //     });

    //   });
  }
  
}

