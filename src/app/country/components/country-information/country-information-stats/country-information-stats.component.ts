import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'country-information-stats',
  imports: [
    DecimalPipe,
  ],
  templateUrl: './country-information-stats.component.html',
})
export class CountryInformationStatsComponent {

  public country = input.required<Country>();



}
