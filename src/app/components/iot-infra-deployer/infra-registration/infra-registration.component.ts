import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as YAML from 'yaml'
import { FlogoDeployService } from 'src/app/services/deployment/flogo-deploy.service';



@Component({
  selector: 'app-infra-registration',
  templateUrl: './infra-registration.component.html',
  styleUrls: ['./infra-registration.component.css']
})
export class InfraRegistrationComponent implements OnInit {
  @Input() name = "";
  @Input() error = "";
  registrationForm: FormGroup;
  projectForm: FormGroup;
  parsedFile: any;
  items = [];
  properties = new Set();
  dockerFile:any;

  constructor(private flogoDeployService: FlogoDeployService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.createForm();
    this.projectForm = this.formBuilder.group({
      projectName: [null, Validators.required],
      projectDescription: [null, Validators.required]
  });
}
  // getName() { return this.projectForm.get('projectName'); }


  onFileSelected(event) {
    //parse yml file
  
      let files = event.target.files;

    if (event && event.target && event.target.files) {

      const file: File = event.target.files[0];

      if (file) {
        console.log("Selected file: ", file.name);
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.dockerFile = fileReader.result;
          this.parsedFile = YAML.parse(fileReader.result as string);
          //test if file is empty
          try {
            if (this.parsedFile==null) {
                alert('file is empty');
                return;
              } }catch (e) {
                console.log(e);
              }
          //add containers to items list
          if (this.parsedFile.services) {
            for (const key in this.parsedFile.services) {
              this.items.push(this.parsedFile.services[key])
            }
            console.log(this.items);
            this.name = "Custom Properties:";
            
            this.addform();
          }
          else{
            alert('enter a valid docker-compose file: add services');
          }
        }
        fileReader.readAsText(file);
      }
    }
  }
  //add input fields for every container
  addform() {
    this.getParameters().clear();
    this.properties.clear();
    if (this.items) {
      for (const container of this.items) {
        const item = container.environment;
        // console.log(item)
        if (item) {
          for (let key in item) {
            // console.log(item[key]);
            if (item[key]) {
              const field = item[key];
              if (field[0] == '$') {
                const lastIndex = field.length - 1;
                const propety = field.slice(2, lastIndex);
                if (this.properties.has(propety) == false) {
                  this.properties.add(propety);
                  this.addParameterItem(propety);
                }
              }
            }
          }
        }
<<<<<<< HEAD
=======
        else{
          alert('enter a valid docker-compose file: add properties');
        }
>>>>>>> b30b9cbef6d792c98cff33c76b875094af058861
      }
    }
    else{
      alert('enter a valid docker-compose file: add containers');
    }
  }
  //make dynamic forms
  createForm() {
    console.log("Creating form");
    this.registrationForm = this.formBuilder.group({
      parameters: this.formBuilder.array([], Validators.required)
    });

  }
  createParameter(name): FormGroup {
    console.log("Creating form with param name: ", name);

    return this.formBuilder.group({
      name: [name, Validators.required],
      value: ['', Validators.required]
    });
  }

  getParameters(): FormArray {
    return <FormArray>this.registrationForm.get('parameters');
  }

  addParameterItem(name) {
    this.getParameters().push(this.createParameter(name));
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  //registration

  register() {
    let systemEnv = {};

    // Build dynamic parameters
    let parameters = this.getParameters();
    let numParams = parameters.length;

    for (var i = 0; i < numParams; i++) {

      let control = parameters.at(i)

      let paramName = control.get('name').value;
      let paramValue = control.get('value').value;

      // console.log("Param: ", paramName, " Value: ", paramValue);
      systemEnv[paramName] = paramValue;
    }

    let registrationRequest = {
      "Description": this.projectForm.get('projectDescription').value,
      "Deployable": {
        "Name": this.projectForm.get('projectName').value,
        "Configuration": this.dockerFile,
        "PredefinedVariables": JSON.stringify(systemEnv)
      }
    };
    if (this.registrationForm.valid) {
      console.log('form submitted');
    } else {
      this.error= "Enter all required fields";
      this.validateAllFormFields(this.registrationForm); //{7}
    }


    // console.log("RegistrationRequest: ", registrationRequest);
    // console.log("RegistrationRequest string: ", JSON.stringify(registrationRequest));

    this.flogoDeployService.registerInfra(registrationRequest,this.projectForm.get('projectName').value)
      .subscribe(res => {
        console.log("Received Registration response: ", res);

        let message = 'Success';
        if (res == undefined || res.Success == false) {
          message = 'Failure';
        }

        this._snackBar.open(message, "in project registeration", {
          duration: 3000,
        });

      });

  }
}
