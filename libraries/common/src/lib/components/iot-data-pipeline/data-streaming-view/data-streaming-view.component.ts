import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'common-data-streaming-view',
    templateUrl: './data-streaming-view.component.html',
    styleUrls: ['./data-streaming-view.component.css']
})
export class DataStreamingViewComponent {

  @Input() streamingForm: FormGroup;

  constructor() { }

}
