import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { Device, Resource, TSReading, TSCombinedReading } from 'src/app/shared/models/iot.model';
import { GraphService } from '../../../services/graph/graph.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-iot-gateway-xyz-value',
  templateUrl: './iot-gateway-xyz-value.component.html',
  styleUrls: ['./iot-gateway-xyz-value.component.css']
})
export class IotGatewayXyzValueComponent implements OnInit, OnDestroy, AfterViewInit {
  device: Device;
  instrument: Resource;
  subscriptions: Subscription[] = []
  resourceReadings = [];
  resourceInferredReadings = []
  resourceCombinedReadings: TSCombinedReading[] = []
  numReadings = 1;
  inferredXYZData = ""
  streaming = false;
  displayedColumns = ['created', 'inferredValue']
  dateFormat = 'yyyy-MM-dd HH:mm:ss'
  tableDataSource = new MatTableDataSource<TSCombinedReading>();
  combinedReadingSelection = new SelectionModel<TSCombinedReading>(false, []);


  heatmapRefWidth = 45
  heatmapRefHeight = 27
  heatmapWidth = this.heatmapRefWidth * 20 + 20
  heatmapHeight = this.heatmapRefHeight * 20 + 20
  heatmapMaxDataPoints = 1000
  heatmapMinDataPoints = 0
  heatmapConfig = {
    radius: 1
  }
  heatmapData = {
    max: 5, data: []
  };

  @ViewChild(MatSort) sort: MatSort;

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
    this.getReadings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.sort;
  }


  getReadings() {
    this.combinedReadingSelection.clear();

    this.graphService.getReadings(this.device.name, this.instrument.name, 300)
      .subscribe(res => {
        this.resourceReadings = res as TSReading[];

        console.log("GetReadings Resource: ", this.resourceReadings);
        

        if (this.resourceReadings.length > 0) {
          this.getResourceInferredReadings(this.device.name, this.instrument.name + "_Inferred", this.resourceReadings.length)
        }
      });
  }

  getResourceInferredReadings(deviceName, resourceName, numReadings) {
    this.graphService.getReadings(deviceName, resourceName, numReadings)
      .subscribe(res => {
        this.resourceInferredReadings = res as TSReading[];

        console.log("GetReadings Resource Inferred: ", this.resourceInferredReadings);
        

        this.setResourceCombinedReadings();

      })
  }

  getStreamingReadings() {
    this.subscriptions.push(this.graphService.getReadings(this.device.name, this.instrument.name, 1)
      .subscribe(res => {
        this.resourceReadings = res as TSReading[];

        if (this.resourceReadings.length > 0) {
          this.getStreamingResourceInferredReadings(this.device.name, this.instrument.name + "_Inferred", 1, this.resourceReadings[0].created)
          this.setStreamingXYZData();
        }
      }));
  }

  getStreamingResourceInferredReadings(deviceName, resourceName, numReadings, ts) {
    this.subscriptions.push(this.graphService.getReadingsAt(deviceName, resourceName, ts)
      .subscribe(res => {
        this.resourceInferredReadings = res as TSReading[];
        this.inferredXYZData = ""
        this.setStreamingInferredXYZData();
      }));
  }

  toggleChart() {
    // Remove subscription when going from streaming to non-streaming
    // Add subscribtion when going from non-streaming to streaming by calling
    // getStreamingReading
    if (this.streaming) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.getReadings();
    }
    else {
      this.getStreamingReadings();
    }

    this.streaming = !this.streaming;
  }

  setResourceCombinedReadings() {
    this.resourceCombinedReadings = [];

    this.resourceReadings.forEach(
      reading => {
        this.resourceCombinedReadings.push({
          created: reading.created,
          value: reading.value,
          inferredValue: "N/A"
        })
      }
    );

    this.resourceCombinedReadings.forEach(
      reading => {

        for (var i = 0; i < this.resourceInferredReadings.length; i++) {
          if (reading.created == this.resourceInferredReadings[i].created) {
            reading.inferredValue = this.resourceInferredReadings[i].value;
            break;
          }
        }
      }
    );

    console.log("Combined Readings: ", this.resourceCombinedReadings);


    this.tableDataSource.data = this.resourceCombinedReadings;

    let numReadings = this.resourceCombinedReadings.length;
    if (numReadings > 0) {
      this.dataSelected(this.resourceCombinedReadings[numReadings - 1]);
    }
  }

  dataSelected(row) {
    console.log('Row clicked: ', row);

    this.combinedReadingSelection.select(row);

    this.setXYZHeatmapDataSet(row);

    this.setInferredXYZData(row);
  }

  setInferredXYZData(row) {

    console.log("Setting inferred xyz data", row);
    
    this.inferredXYZData = row.inferredValue;

    console.log("Value set to inferredXYZData: ", row.inferredValue);
    

    if (this.isBase64(row.inferredValue)) {
      console.log("value is base64");
      
      this.inferredXYZData = atob(row.inferredValue);

      console.log("Inferred value set to: ", this.inferredXYZData);
      
    }
    else {
      console.log("Value is not base64");
      
    }

  }

  setStreamingXYZData() {
    this.setXYZHeatmapDataSet(this.resourceReadings[0])
  }

  public setStreamingInferredXYZData() {
    if (this.resourceInferredReadings.length > 0) {
      if (this.isBase64(this.resourceInferredReadings[0].value)) {
        this.inferredXYZData = atob(this.resourceInferredReadings[0].value)
      }
      else {
        this.inferredXYZData = this.resourceInferredReadings[0].value;
      }
    }
    else {
      this.inferredXYZData = ""
    }
  }

  public setXYZHeatmapDataSet(combinedReading) {

    console.log("setXYZHeatmapDataSet: ", combinedReading);
    
    var xyzData = [];

    // var objstr = atob(this.resourceReadings[0].value)
    var objstr = atob(combinedReading.value)

    console.log("Value after atob: ", objstr);

    // console.log("Object str: ", objstr);

    var obj = JSON.parse(objstr);
    var max = 0;
    var min = 99999;
    var scaledVal = 0;
    var scaledDiex = 0;
    var scaledDiey = 0;
    var maxVal = 0;
    var minVal = 9999999;

    // console.log("Object json: ", obj);
    obj.readings.forEach(
      reading => {


        maxVal = Math.max(maxVal, reading.measurement);
        minVal = Math.min(minVal, reading.measurement);
      }
    );

    console.log("MAX Pre scaled value  MAX  MIN : ", maxVal, minVal)


    obj.readings.forEach(
      reading => {
        // var val = Math.floor(reading.measurement*1000000000);
        var val = reading.measurement;
        // if (reading.measurement > 0)
        //   val = Math.floor(reading.measurement*1000000000);
        if (reading.measurement < 0)
          val = 0;

        // console.log("Pre scaled value: ", val)

        // scaledVal = this.scaleValue(val, [0,+847], [0,this.heatmapMaxDataPoints]);
        scaledVal = this.scaleValue(val, [minVal, maxVal], [0, this.heatmapMaxDataPoints]);

        max = Math.max(max, scaledVal);

        scaledDiex = this.scaleValue(reading.diex, [0, this.heatmapRefWidth], [0, this.heatmapWidth]);
        scaledDiey = this.scaleValue(reading.diey, [0, this.heatmapRefHeight], [0, this.heatmapHeight]);

        // console.log("Reading: ", reading);
        xyzData.push({ x: Number(scaledDiex), y: Number(scaledDiey), value: scaledVal, radius: 20 });
      }
    );
    console.log("data transformed: ", xyzData);
    console.log("Max Min: ", max, min);
    this.heatmapData = {
      max: max, data: xyzData
    };
  }

  scaleValue(value, from, to) {
    var scale = (to[1] - to[0]) / (from[1] - from[0]);
    var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return ~~(capped * scale + to[0]);
  }



  // var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  isBase64(encodedString) {
    var regexBase64 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return regexBase64.test(encodedString);   // return TRUE if its base64 string.
  }
}
