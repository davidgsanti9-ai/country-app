import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-europa-svg',
  imports: [],
  templateUrl: './europa-svg.component.html',
})
export class EuropaSvgComponent {

  public isActive = input.required<boolean>();

}
