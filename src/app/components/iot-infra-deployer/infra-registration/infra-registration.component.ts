import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as YAML from 'yaml'
import { MatExpansionModule } from '@angular/material/expansion';



@Component({
  selector: 'app-infra-registration',
  templateUrl: './infra-registration.component.html',
  styleUrls: ['./infra-registration.component.css']
})
export class InfraRegistrationComponent implements OnInit {
  @Input()name="";
  registrationForm: FormGroup;
  parsedFile: any;
  items = [];
  properties = new Set();


  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  onFileSelected(event) {
    //parse yml file
    if (event && event.target && event.target.files) {

      const file: File = event.target.files[0];

      if (file) {
        console.log("Selected file: ", file.name);
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.parsedFile = YAML.parse(fileReader.result as string);
          //add containers to items list
          if (this.parsedFile.services) {
            for (const key in this.parsedFile.services) {
              this.items.push(this.parsedFile.services[key])
            }
            console.log(this.items);
            this.name="Container Properties:";
            this.addform() ;
          }
        }
        fileReader.readAsText(file);
      }
    }
  }
  //add input fields for every container
  addform() {
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
      }
    }
  }
  //make dynamic forms
  createForm() {
    console.log("Creating form");
    this.registrationForm = this.formBuilder.group({
      containerName: ['', Validators.required],
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
  //registration
  save() {

  }

  register() {

  }
}
