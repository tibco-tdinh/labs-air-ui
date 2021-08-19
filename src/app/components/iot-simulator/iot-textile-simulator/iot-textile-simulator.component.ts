import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-iot-textile-simulator',
  templateUrl: './iot-textile-simulator.component.html',
  styleUrls: ['./iot-textile-simulator.component.css']
})
export class IotTextileSimulatorComponent implements OnInit, AfterViewInit {

  videoPlayed = false;

  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
  }

  playVideo(): void {
    // HTTP Callback to show the user has clicked the video to play it

  }

  handleAction(defect: string) {
    // HTTP Callback to detect which
  }

}
