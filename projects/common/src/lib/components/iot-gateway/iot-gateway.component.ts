import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SelectionModel } from '@angular/cdk/collections';

import { Gateway, DataStoreMetadata, Device } from '../../models/iot.model';
import { EdgeService } from '../../services/edge/edge.service';
import { GraphService } from '../../services/graph/graph.service';
import { DatastoreService } from '../../services/datastore/datastore.service';
//import { merge } from "rxjs/observable/merge";
//import { fromEvent } from 'rxjs/observable/fromEvent';
// // import { DevicesDataSource } from "../services/edge/devices.datasource";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-common-iot-gateway',
    templateUrl: './iot-gateway.component.html',
    styleUrls: ['./iot-gateway.component.css']
})
export class CommonIotGatewayComponent implements OnInit, AfterViewInit {

  // Map configuration
  mapConfig = {};

  gatewayOpDisabled = true;
  publisherDisabled = true;
  cloudDataPipelineDisable = true;
  edgeDataPipelineDisable = true;
  selectedGateway: Gateway = new Gateway();
  hideAccessToken = true;
  dateFormat = 'yyyy-MM-dd  HH:mm:ss';

  dataStoreMetadata: DataStoreMetadata = new DataStoreMetadata();

  gatewayForm: FormGroup;
  dataSource = new MatTableDataSource<Gateway>();
  displayedColumns: string[] = ['uuid', 'created', 'updated'];
  selection = new SelectionModel<Gateway>(false, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort();

  constructor(private graphService: GraphService,
    private edgeService: EdgeService,
    private datastoreService: DatastoreService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _datePipe: DatePipe) {

      this.gatewayForm = this.formBuilder.group({
          uid: [''],
          uuid: ['', Validators.required],
          description: ['', Validators.required],
          address: ['', Validators.required],
          latitude: ['', Validators.required],
          longitude: ['', Validators.required],
          accessToken: ['', Validators.required]
      });

  }

  ngOnInit() {
      // this.dataSource = new DevicesDataSource(this.edgeService);
      // this.dataSource.loadDevices();
      this.getGateways();

      // selection changed
      // this.selection.onChange.subscribe((a) => {
      //   if (a.added[0])   // will be undefined if no selection
      //   {
      //     // alert('You selected ' + a.added[0]);
      //     console.log('Row clicked: ', a.added[0]);
      //   }
      // });

  }

  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
  }

  public getGateways() {
      console.log('Getting Gateways called');
      console.debug('Getting Gateways');


      this.graphService.getGateways()
          .subscribe(res => {
              this.dataSource.data = res as Gateway[];
              console.log('Received response for graphService.getGateways: ', res);
              this.buildMaporamaData();

              // Move code to update data stores to a button action
              // this.updateDataStores();
          });
  }

  buildMaporamaData() {

      const mapData:[] = [];

      this.dataSource.data.forEach(
          gateway => {

              /*mapData.push({
          lat: gateway.latitude,
          lon: gateway.longitude,
          label: gateway.uuid,
          uuid: gateway.uid
        });*/
          }
      );

      this.mapConfig = {
          createMap: true,
          centerLat: 36.0,
          centerLon: -98.0,
          zoom: 4,
          showColorAxis: false,
          data: mapData
      };

  }

  addGateway() {
      console.log('Adding Gateway');

      if (this.gatewayExist(this.gatewayForm.controls['uuid'].value)) {
          console.log('Current Time: ', this._datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ssZZZZZ'));
          const message = 'Fail - Not unique';

          this._snackBar.open(message, 'Add Gateway', {
              duration: 3000,
          });
      }
      else {
          const gate = new Gateway();

          // let dateNow = this._datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ssZZZZZ');
          const tsms = Date.now();

          gate.uuid = this.gatewayForm.controls['uuid'].value;
          gate.description = this.gatewayForm.controls['description'].value;
          gate.address = this.gatewayForm.controls['address'].value;
          gate.createdts = tsms;
          gate.latitude = this.gatewayForm.controls['latitude'].value;
          gate.longitude = this.gatewayForm.controls['longitude'].value;
          gate.accessToken = this.gatewayForm.controls['accessToken'].value;
          gate.updatedts = tsms;

          this.graphService.addGateway(gate)
              .subscribe(res => {
                  console.log('Added gateway');

                  this.getGateways();
                  this.resetGatewayForm();
              });
      }
  }

  updateGateway() {
      const gate = new Gateway();

      // let dateNow = this._datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ssZZZZZ');

      const tsms = Date.now();

      gate.uid = this.gatewayForm.controls['uid'].value;
      gate.uuid = this.gatewayForm.controls['uuid'].value;
      gate.description = this.gatewayForm.controls['description'].value;
      gate.address = this.gatewayForm.controls['address'].value;
      gate.latitude = this.gatewayForm.controls['latitude'].value;
      gate.longitude = this.gatewayForm.controls['longitude'].value;
      gate.accessToken = this.gatewayForm.controls['accessToken'].value;
      gate.updatedts = tsms;

      this.graphService.updateGateway(gate)
          .subscribe(res => {
              console.log('Updated gateway');

              this.getGateways();
              this.resetGatewayForm();
          });
  }

  deleteGateway() {

      this.graphService.deleteGateway(this.gatewayForm.controls['uid'].value)
          .subscribe(res => {
              console.log('Deleted gateway');

              this.getGateways();
              this.resetGatewayForm();
          });
  }

  pingGateway(gateway?: Gateway) {

      if (gateway) {
          this.edgeService.pingCoreMetadata(gateway)
              .subscribe(res => {
                  console.log('Received ping response: ', res);

                  let message = 'Success';
                  if (res == undefined) {
                      message = 'Failure';
                  }

                  this._snackBar.open(message, 'Ping Gateway', {
                      duration: 3000,
                  });

              });
      }

  }

  updateDataStoreForGateway(gateway: Gateway) {

      this.edgeService.getDevices(gateway)
          .subscribe(res => {

              this.dataStoreMetadata = {
                  gateway: gateway,
                  devices: res as Device[]
              };

              console.log('Metadata: ', this.dataStoreMetadata);

              this.datastoreService.updateDataStoreForGateway(this.dataStoreMetadata)
                  .subscribe(restxt => {
                      console.log('Metadata response: ', restxt);
                  }
                  );

          });
  }

  updateDataStores () {

      this.dataSource.data.forEach(
          (gateway, index) => {

              if (index == 0) {
                  console.log('Calling save metadata on datastore');

                  this.updateDataStoreForGateway(gateway);
              }

          }
      );


  }




  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
      // const numSelected = this.selection.selected.length;
      // const numRows = this.dataSource.data.length;
      // return numSelected === numRows;
      return false;
  }

  applyFilter(target: EventTarget | null) {
      if (target){
          const htmlTextArea = target as HTMLTextAreaElement;
          this.dataSource.filter = htmlTextArea.value.trim().toLowerCase();
      }
  }

  onRowClicked(row: any) {
      //console.log('Row clicked: ', row);

      // Enable/Disable variables
      this.gatewayOpDisabled = false;
      this.publisherDisabled = false;
      this.cloudDataPipelineDisable = false;
      this.edgeDataPipelineDisable = false;
      this.selection.select(row);
      // this.selectedGateway = row.uuid;

      // Update Gateway Form
      this.gatewayForm.patchValue({
          uid: row.uid,
          uuid: row.uuid,
          description: row.description,
          address: row.address,
          latitude: row.latitude,
          longitude: row.longitude,
          accessToken: row.accessToken
      });

  }

  gatewayExist(gatewayUuid: string): boolean {
      let found = false;

      this.dataSource.data.forEach(
          gateway => {

              if (gateway.uuid == gatewayUuid) {
                  found = true;

              }
          }
      );

      return found;
  }

  resetGatewayForm() {
      this.gatewayForm.reset();

      this.gatewayOpDisabled = true;
      this.publisherDisabled = true;
      this.cloudDataPipelineDisable = true;
      this.edgeDataPipelineDisable = true;

  }

  selectGateway(gateway?: Gateway) {
      if (gateway) {
          this.selectedGateway = gateway;
          this.gatewayOpDisabled = false;
      } else {
          this.selectedGateway = new Gateway();
          this.gatewayOpDisabled = true;
      }
  }

  generateColor(gatewayName: string) {
      let hash = 0;
      for (let i = 0; i < gatewayName.length; i++) {
          hash = gatewayName.charCodeAt(i) + ((hash << 5) - hash);
      }
      return 'hsl(' + hash % 360 + ', 100%, 40%)';
  }
}
