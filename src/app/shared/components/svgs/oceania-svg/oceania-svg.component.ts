import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-oceania-svg',
  imports: [],
  templateUrl: './oceania-svg.component.html',
})
export class OceaniaSvgComponent {

  public isActive = input.required<boolean>();


}
