import { Component, input } from '@angular/core';

@Component({
  selector: 'country-information-diff',
  imports: [],
  templateUrl: './country-information-diff.component.html',
})
export class CountryInformationDiffComponent {


  public img = input.required<string>();


}
