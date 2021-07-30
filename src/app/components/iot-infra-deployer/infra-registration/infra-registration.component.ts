import { Component, OnInit } from '@angular/core';
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
  registrationForm: FormGroup;  
  parsedFile:any;
  items=[];


  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {

   }

  ngOnInit(): void {
    this.createForm();
    }

    onFileSelected(event) {
      //parse yml file

      const file: File = event.target.files[0];
  
      if (file) {
  
        console.log("Selected file: ", file.name);
  
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.parsedFile=YAML.parse(fileReader.result as string);
        //add containers 
          for (const key in this.parsedFile.services){
            this.items.push([this.parsedFile.services[key].container_name,this.parsedFile.services[key].environment])
         }
            
        }
        fileReader.readAsText(file);    
      }


    }
  //add container parameters
  addform(item){
    this.getParameters().clear();
      console.log(typeof item[1]);
       for (let param in item[1]){
           this.addParameterItem(param);}
  }
  //make dynamic forms
  createForm() {
    console.log("Creating form");
    this.registrationForm = this.formBuilder.group({
      containerName: ['', Validators.required],
      parameters: this.formBuilder.array([],Validators.required)
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
    return <FormArray> this.registrationForm.get('parameters');
  }

  addParameterItem(name) {
    this.getParameters().push(this.createParameter(name));
  }
//registration
  save(){

  }

  register(){

  }
}
