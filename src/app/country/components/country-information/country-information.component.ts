import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { CountryInformationDiffComponent } from "./country-information-diff/country-information-diff.component";
import { CountryInformationContinentComponent } from "./country-information-continent/country-information-continent.component";
import { CountryInformationStatsComponent } from "./country-information-stats/country-information-stats.component";

@Component({
  selector: 'country-information',
  imports: [
    CountryInformationDiffComponent,
    CountryInformationContinentComponent,
    CountryInformationStatsComponent
],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {

  public country = input.required<Country>();


}
