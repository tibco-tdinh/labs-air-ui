import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdgeService } from '../../../services/edge/edge.service';
import { GraphService } from '../../../services/graph/graph.service';
import { Device, Resource, Gateway, Rule } from '../../../models/iot.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface SelectItem {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-common-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() devices: Device[];
  @Input() gateway: Gateway;

  dateFormat = 'yyyy-MM-dd  HH:mm:ss'

  // Form variables
  ruleForm: FormGroup;

  rulesDataSource = new MatTableDataSource<Rule>();
  ruleDisplayedColumns: string[] = ['id', 'name', 'description', 'created', 'modified'];
  ruleSelection = new SelectionModel<Rule>(false, []);

  devicesDataSource = new MatTableDataSource<Device>();
  conditionResourcesDataSource = new MatTableDataSource<Resource>();
  actionResourcesDataSource = new MatTableDataSource<Resource>();

  operations: SelectItem[] = [
      { value: '==', viewValue: '==' },
      { value: '>', viewValue: '>' },
      { value: '>=', viewValue: '>=' },
      { value: '<', viewValue: '<' },
      { value: '<=', viewValue: '<=' }
  ];



  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private edgeService: EdgeService,
    private graphService: GraphService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

      this.ruleForm = this.formBuilder.group({
          name: ['', Validators.required],
          description: [''],
          useInferredValue: [false],
          condDevice: ['', Validators.required],
          condResource: ['', Validators.required],
          condCompareNewMetricToValue: [true],
          condCompareNewMetricToValueOp: ['', Validators.required],
          condCompareNewMetricValue: ['', Validators.required],
          condCompareNewMetricToLastMetric: [false],
          condCompareNewMetricToLastMetricOp: [''],
          condCompareLastMetricToValue: [false],
          condCompareLastMetricToValueOp: [''],
          condCompareLastMetricValue: [''],
          actionSendNotification: [true],
          actionNotification: ['', Validators.required],
          actionSendCommand: [true],
          actionDevice: ['', Validators.required],
          actionResource: ['', Validators.required],
          actionValue: ['', Validators.required],
          created: [''],
          modified: [''],
          uid: ['']
      });

      this.setCondConpareNewMetricToValueValidators();
      this.setCondConpareNewMetricToLastMetricValidators();
      this.setCondConpareLastMetricToValueValidators();
      this.setActionSendNotificationValidators();
      this.setActionSendCommandValidators();

      this.devicesDataSource.data = this.devices;
      this.getRules(this.gateway);

  }

  ngOnChanges(changes: SimpleChanges) {

      this.devicesDataSource.data = this.devices;
      this.getRules(this.gateway);

  }

  ngAfterViewInit() {
      this.devicesDataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
      this.rulesDataSource.filter = filterValue.trim().toLowerCase();
  }


  public getRules(gateway) {
      this.graphService.getRules(gateway.uuid)
          .subscribe(res => {
              this.rulesDataSource.data = res as Rule[];

              console.log('Rules received: ', this.rulesDataSource.data);
          });
  }


  onRuleClicked(row) {

      console.log('Row clicked: ', row);

      this.ruleSelection.select(row);

      // Set the resourceDataSource
      let idx = this.getIndexForDeviceDataSource(row.condDevice);
      this.conditionResourcesDataSource.data = this.devicesDataSource.data[idx].profile.deviceResources as Resource[];

      idx = this.getIndexForDeviceDataSource(row.actionDevice);
      this.actionResourcesDataSource.data = this.devicesDataSource.data[idx].profile.deviceResources as Resource[];

      // Update Instrument Form
      this.ruleForm.reset({
          name: row.name,
          description: row.description,
          useInferredValue: row.useInferredValue,
          condDevice: row.condDevice,
          condResource: row.condResource,
          condCompareNewMetricToValue: row.condCompareNewMetricToValue,
          condCompareNewMetricToValueOp: row.condCompareNewMetricToValueOp,
          condCompareNewMetricValue: row.condCompareNewMetricValue,
          condCompareNewMetricToLastMetric: row.condCompareNewMetricToLastMetric,
          condCompareNewMetricToLastMetricOp: row.condCompareNewMetricToLastMetricOp,
          condCompareLastMetricToValue: row.condCompareLastMetricToValue,
          condCompareLastMetricToValueOp: row.condCompareLastMetricToValueOp,
          condCompareLastMetricValue: row.condCompareLastMetricValue,
          actionSendNotification: row.actionSendNotification,
          actionNotification: row.actionNotification,
          actionSendCommand: row.actionSendCommand,
          actionDevice: row.actionDevice,
          actionResource: row.actionResource,
          actionValue: row.actionValue,
          created: row.created,
          modified: row.modified,
          uid: row.uid
      }, { emitEvent: true });

  }

  onConditionDeviceSelected(event) {

      console.log('Condition Device Selected: ', event);

      // Set the resourceDataSource
      const idx = this.getIndexForDeviceDataSource(event.value);
      this.conditionResourcesDataSource.data = this.devicesDataSource.data[idx].profile.deviceResources as Resource[];
  }

  onActionDeviceSelected(event) {

      console.log('Action Device Selected: ', event);

      // Set the resourceDataSource
      const idx = this.getIndexForDeviceDataSource(event.value);
      this.actionResourcesDataSource.data = this.devicesDataSource.data[idx].profile.deviceResources as Resource[];
  }

  onResourceSelected(event) {

  }


  onCommandResourceSelected(event) {

  }


  onSelection() {

  }

  resetRuleForm() {
      console.log('Resetting rule form');

      this.ruleForm.reset({
      }, { emitEvent: false });

      console.log('Form after resetting: ', this.ruleForm);

  }

  addRule() {
      console.log('Adding rule');

      const ts = Date.now();
      const rule = new Rule();
      rule.name = this.ruleForm.controls['name'].value;
      rule.uuid = this.ruleForm.controls['name'].value;
      rule.description = this.ruleForm.controls['description'].value;
      rule.useInferredValue = this.ruleForm.controls['useInferredValue'].value;
      rule.condDevice = this.ruleForm.controls['condDevice'].value;
      rule.condResource = this.ruleForm.controls['condResource'].value;
      rule.condCompareNewMetricToValue = this.ruleForm.controls['condCompareNewMetricToValue'].value;
      rule.condCompareNewMetricToValueOp = this.ruleForm.controls['condCompareNewMetricToValueOp'].value;
      rule.condCompareNewMetricValue = this.ruleForm.controls['condCompareNewMetricValue'].value;
      rule.condCompareNewMetricToLastMetric = this.ruleForm.controls['condCompareNewMetricToLastMetric'].value;
      rule.condCompareNewMetricToLastMetricOp = this.ruleForm.controls['condCompareNewMetricToLastMetricOp'].value;
      rule.condCompareLastMetricToValue = this.ruleForm.controls['condCompareLastMetricToValue'].value;
      rule.condCompareLastMetricToValueOp = this.ruleForm.controls['condCompareLastMetricToValueOp'].value;
      rule.condCompareLastMetricValue = this.ruleForm.controls['condCompareLastMetricValue'].value;
      rule.actionSendNotification = this.ruleForm.controls['actionSendNotification'].value;
      rule.actionNotification = this.ruleForm.controls['actionNotification'].value;
      rule.actionSendCommand = this.ruleForm.controls['actionSendCommand'].value;
      rule.actionDevice = this.ruleForm.controls['actionDevice'].value;
      rule.actionResource = this.ruleForm.controls['actionResource'].value;
      rule.actionValue = this.ruleForm.controls['actionValue'].value;
      rule.created = ts;
      rule.modified = ts;

      this.graphService.addRule(this.gateway.uid, rule)
          .subscribe(res => {
              console.log('Result from add rule to dgraph', res);

              this.getRules(this.gateway);
              this.resetRuleForm();
          });
  }

  updateRule() {
      console.log('Inside updateRule function');

      const ts = Date.now();
      const rule = new Rule();
      rule.name = this.ruleForm.controls['name'].value;
      rule.uuid = this.ruleForm.controls['name'].value;
      rule.useInferredValue = this.ruleForm.controls['useInferredValue'].value;
      rule.description = this.ruleForm.controls['description'].value;
      rule.condDevice = this.ruleForm.controls['condDevice'].value;
      rule.condResource = this.ruleForm.controls['condResource'].value;
      rule.condCompareNewMetricToValue = this.ruleForm.controls['condCompareNewMetricToValue'].value;
      rule.condCompareNewMetricToValueOp = this.ruleForm.controls['condCompareNewMetricToValueOp'].value;
      rule.condCompareNewMetricValue = this.ruleForm.controls['condCompareNewMetricValue'].value;
      rule.condCompareNewMetricToLastMetric = this.ruleForm.controls['condCompareNewMetricToLastMetric'].value;
      rule.condCompareNewMetricToLastMetricOp = this.ruleForm.controls['condCompareNewMetricToLastMetricOp'].value;
      rule.condCompareLastMetricToValue = this.ruleForm.controls['condCompareLastMetricToValue'].value;
      rule.condCompareLastMetricToValueOp = this.ruleForm.controls['condCompareLastMetricToValueOp'].value;
      rule.condCompareLastMetricValue = this.ruleForm.controls['condCompareLastMetricValue'].value;
      rule.actionSendNotification = this.ruleForm.controls['actionSendNotification'].value;
      rule.actionNotification = this.ruleForm.controls['actionNotification'].value;
      rule.actionSendCommand = this.ruleForm.controls['actionSendCommand'].value;
      rule.actionDevice = this.ruleForm.controls['actionDevice'].value;
      rule.actionResource = this.ruleForm.controls['actionResource'].value;
      rule.actionValue = this.ruleForm.controls['actionValue'].value;
      rule.uid = this.ruleForm.controls['uid'].value;
      rule.modified = ts;

      this.graphService.updateRule(rule)
          .subscribe(res => {
              console.log('Result from update dgraph', res);

              this.getRules(this.gateway);
              this.resetRuleForm();
          });
  }

  deleteRule() {
      this.graphService.deleteRule(this.gateway.uid, this.ruleForm.controls['uid'].value)
          .subscribe(res => {
              console.log('Result from delete ', res);

              this.getRules(this.gateway);
              this.resetRuleForm();

          });
  }

  getIndexForDeviceDataSource(name: string): number {
      let idx = 0;

      for (let i = 0; i < this.devicesDataSource.data.length; i++) {

          if (this.devicesDataSource.data[i].name == name) {
              idx = i;
              break;
          }
      }

      return idx;
  }


  onFormChanges(): void {
      this.ruleForm.valueChanges.subscribe(val => {
          console.log('Form has changed for: ', val.name);

          if (this.ruleForm.dirty) {
              console.log('form is dirty');
          }

      });
  }

  setCondConpareNewMetricToValueValidators() {
      const condCompareNewMetricToValueOpControl = this.ruleForm.get('condCompareNewMetricToValueOp');
      const condCompareNewMetricValueControl = this.ruleForm.get('condCompareNewMetricValue');

      this.ruleForm.get('condCompareNewMetricToValue').valueChanges
          .subscribe(compareToValue => {

              if (compareToValue) {
                  console.log('setting validator for compare to value');
                  condCompareNewMetricToValueOpControl.setValidators([Validators.required]);
                  condCompareNewMetricValueControl.setValidators([Validators.required]);
              }
              else {
                  console.log('clearing validator for action notification');
                  condCompareNewMetricToValueOpControl.setValidators(null);
                  condCompareNewMetricValueControl.setValidators(null);
              }

              condCompareNewMetricToValueOpControl.updateValueAndValidity();
              condCompareNewMetricValueControl.updateValueAndValidity();
          });

  }

  setCondConpareNewMetricToLastMetricValidators() {
      const condCompareNewMetricToLastMetricOpControl = this.ruleForm.get('condCompareNewMetricToLastMetricOp');

      this.ruleForm.get('condCompareNewMetricToLastMetric').valueChanges
          .subscribe(compareToLastValue => {

              if (compareToLastValue) {
                  console.log('setting validator for compare to value');
                  condCompareNewMetricToLastMetricOpControl.setValidators([Validators.required]);
              }
              else {
                  console.log('clearing validator for action notification');
                  condCompareNewMetricToLastMetricOpControl.setValidators(null);
              }

              condCompareNewMetricToLastMetricOpControl.updateValueAndValidity();
          });
  }

  setCondConpareLastMetricToValueValidators() {
      const condCompareLastMetricToValueOpControl = this.ruleForm.get('condCompareLastMetricToValueOp');
      const condCompareLastMetricValueControl = this.ruleForm.get('condCompareLastMetricValue');

      this.ruleForm.get('condCompareLastMetricToValue').valueChanges
          .subscribe(compareToValue => {

              if (compareToValue) {
                  console.log('setting validator for compare to value');
                  condCompareLastMetricToValueOpControl.setValidators([Validators.required]);
                  condCompareLastMetricValueControl.setValidators([Validators.required]);
              }
              else {
                  console.log('clearing validator for action notification');
                  condCompareLastMetricToValueOpControl.setValidators(null);
                  condCompareLastMetricValueControl.setValidators(null);
              }

              condCompareLastMetricToValueOpControl.updateValueAndValidity();
              condCompareLastMetricValueControl.updateValueAndValidity();
          });

  }

  setActionSendNotificationValidators() {
      const actionNotificationControl = this.ruleForm.get('actionNotification');

      this.ruleForm.get('actionSendNotification').valueChanges
          .subscribe(sendNotification => {

              if (sendNotification) {
                  console.log('setting validator for action notification');
                  actionNotificationControl.setValidators([Validators.required]);
              }
              else {
                  console.log('clearing validator for action notification');
                  actionNotificationControl.setValidators(null);
              }

              actionNotificationControl.updateValueAndValidity();
          });
  }

  setActionSendCommandValidators() {
      const actionDeviceControl = this.ruleForm.get('actionDevice');
      const actionResourceControl = this.ruleForm.get('actionResource');
      const actionValueControl = this.ruleForm.get('actionValue');

      this.ruleForm.get('actionSendCommand').valueChanges
          .subscribe(sendCommand => {

              if (sendCommand) {
                  console.log('setting validator for command fields');
                  actionDeviceControl.setValidators([Validators.required]);
                  actionResourceControl.setValidators([Validators.required]);
                  actionValueControl.setValidators([Validators.required]);
              }
              else {
                  console.log('clearing validator for command fields');
                  actionDeviceControl.setValidators(null);
                  actionResourceControl.setValidators(null);
                  actionValueControl.setValidators(null);
              }

              actionDeviceControl.updateValueAndValidity();
              actionResourceControl.updateValueAndValidity();
              actionValueControl.updateValueAndValidity();
          });
  }


  deployRule() {

      const ts = Date.now();
      const rule = new Rule();

      if (this.ruleForm.controls['useInferredValue'].value) {
          rule.name = this.ruleForm.controls['name'].value + '_Inferred';
      }
      else {
          rule.name = this.ruleForm.controls['name'].value;
      }


      rule.uuid = this.ruleForm.controls['name'].value;
      rule.description = this.ruleForm.controls['description'].value;
      rule.condDevice = this.ruleForm.controls['condDevice'].value;
      rule.condResource = this.ruleForm.controls['condResource'].value;
      rule.condCompareNewMetricToValue = this.ruleForm.controls['condCompareNewMetricToValue'].value;
      rule.condCompareNewMetricToValueOp = this.ruleForm.controls['condCompareNewMetricToValueOp'].value;
      rule.condCompareNewMetricValue = this.ruleForm.controls['condCompareNewMetricValue'].value;
      rule.condCompareNewMetricToLastMetric = this.ruleForm.controls['condCompareNewMetricToLastMetric'].value;
      rule.condCompareNewMetricToLastMetricOp = this.ruleForm.controls['condCompareNewMetricToLastMetricOp'].value;
      rule.condCompareLastMetricToValue = this.ruleForm.controls['condCompareLastMetricToValue'].value;
      rule.condCompareLastMetricToValueOp = this.ruleForm.controls['condCompareLastMetricToValueOp'].value;
      rule.condCompareLastMetricValue = this.ruleForm.controls['condCompareLastMetricValue'].value;
      rule.actionSendNotification = this.ruleForm.controls['actionSendNotification'].value;
      rule.actionNotification = this.ruleForm.controls['actionNotification'].value;
      rule.actionSendCommand = this.ruleForm.controls['actionSendCommand'].value;
      rule.actionDevice = this.ruleForm.controls['actionDevice'].value;
      rule.actionResource = this.ruleForm.controls['actionResource'].value;
      rule.actionValue = this.ruleForm.controls['actionValue'].value;
      rule.created = ts;
      rule.modified = ts;

      this.edgeService.addRule(this.gateway, rule)
          .subscribe(res => {
              console.log('Result from adding rule: ', res);

              let message = 'Success';
              if (res == undefined) {
                  message = 'Failure';
              }

              this._snackBar.open(message, 'Deploy Rule', {
                  duration: 3000,
              });

          });
  }


  undeployRule() {
      const rule = new Rule();

      if (this.ruleForm.controls['useInferredValue'].value) {
          rule.name = this.ruleForm.controls['name'].value + '_Inferred';
      }
      else {
          rule.name = this.ruleForm.controls['name'].value;
      }

      this.edgeService.deleteRule(this.gateway, rule)
          .subscribe(res => {
              console.log('Result from deleting rule: ', res);

              let message = 'Success';
              if (res == undefined) {
                  message = 'Failure';
              }

              this._snackBar.open(message, 'Undeploy Rule', {
                  duration: 3000,
              });

          });

  }

}
