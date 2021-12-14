import { Component, Input } from '@angular/core';

@Component({
  template: `
  <img  class="rete-image" [src]="imageUrl"/>
  `,
  styles: [
    `
      input {
        border-radius: 30px;
        background-color: white;
        padding: 2px 6px;
        border: 1px solid #999;
        font-size: 110%;
        width: 140px;
        box-sizing: border-box;
      }

      .rete-image {
        filter: invert(100%) sepia(6%) saturate(2%) hue-rotate(297deg) brightness(106%) contrast(100%);
        height: 48px;
        width: 48px;
      }
    `
  ]
})
export class ImageControlDisplay {
  @Input() value: number;
  @Input() readonly: boolean;
  @Input() imageName: string;
  @Input() change: Function;
  @Input() mounted: Function;

  imageUrl = '';

  ngOnInit() {
    console.log("ImageControlDisplay Initializing control with: ", this.value);
    this.imageUrl = '/assets/img/' + this.imageName;
    this.mounted();
  }

}
