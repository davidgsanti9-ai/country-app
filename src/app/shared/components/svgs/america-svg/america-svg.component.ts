import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-america-svg',
  imports: [],
  templateUrl: './america-svg.component.html',
})
export class AmericaSvgComponent {

  public isActive = input.required<boolean>();

}
