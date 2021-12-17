import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-common',
  template: `
    <p>
      common proof of concept
    </p>
  `,
  styles: [
  ]
})
export class CommonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
