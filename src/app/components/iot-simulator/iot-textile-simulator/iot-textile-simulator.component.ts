import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-iot-textile-simulator',
  templateUrl: './iot-textile-simulator.component.html',
  styleUrls: ['./iot-textile-simulator.component.css']
})
export class IotTextileSimulatorComponent implements OnInit, AfterViewInit {

  videoPlayed = false;
  currentDefect: string;
  pieChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: ''
    }
  };
  pieChartLabels: Label[] = [];
  pieChartData: SingleDataSet = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  chartData = [
    {
      "Count": 34,
      "Filter": "*",
      "Label": "good",
      "TestID": "id-00000004"
    },
    {
      "Count": 17,
      "Filter": "*",
      "Label": "missing_pick",
      "TestID": "id-00000004"
    },
    {
      "Count": 11,
      "Filter": "*",
      "Label": "selvedge",
      "TestID": "id-00000004"
    },
    {
      "Count": 10,
      "Filter": "*",
      "Label": "hole",
      "TestID": "id-00000004"
    },
    {
      "Count": 10,
      "Filter": "*",
      "Label": "stain",
      "TestID": "id-00000004"
    },
    {
      "Count": 19,
      "Filter": "*",
      "Label": "color_flecks",
      "TestID": "id-00000004"
    }
  ]
  chartColumns = ['Label', 'Count']
  constructor() { }

  ngOnInit(): void {
    this.handleChartData();
  }


  ngAfterViewInit(): void {
  }

  playVideo(): void {
    // HTTP Callback to show the user has clicked the video to play it

  }

  handleAction(defect: string) {
    // HTTP Callback to detect which
  }

  handleChartData(): void {
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.chartData.forEach(dataSet => {
      this.pieChartLabels.push(dataSet.Label);
      this.pieChartData.push(dataSet.Count);
    });
    this.pieChartOptions.title.text = this.chartData[0].TestID
  }
}
