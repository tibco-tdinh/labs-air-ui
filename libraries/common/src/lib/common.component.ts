import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-common',
  template: `
    <p>
      something else: {{ data }}
    </p>
  `,
  styles: [
  ]
})
export class CommonComponent implements OnInit {
  @Input() data: string;

  constructor() { }

  ngOnInit(): void {
  }

}
