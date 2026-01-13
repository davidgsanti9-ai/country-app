import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-africa-svg',
  imports: [],
  templateUrl: './africa-svg.component.html',
})
export class AfricaSvgComponent {

  public isActive = input.required<boolean>();


}
