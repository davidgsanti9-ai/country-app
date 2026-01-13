import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-antartica-svg',
  imports: [],
  templateUrl: './antartica-svg.component.html',
})
export class AntarticaSvgComponent {

  public isActive = input.required<boolean>();


}
