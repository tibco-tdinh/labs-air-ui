import { Component, Input } from '@angular/core';

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
export class CommonComponent {
  @Input() data: string;

  constructor() { }

}
