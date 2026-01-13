import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-asia-svg',
  imports: [],
  templateUrl: './asia-svg.component.html',
})
export class AsiaSvgComponent {

  public isActive = input.required<boolean>();


}
