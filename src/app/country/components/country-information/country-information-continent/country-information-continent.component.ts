import { Component, input } from '@angular/core';
import { EuropaSvgComponent } from "../../../../shared/components/svgs/europa-svg/europa-svg.component";
import { OceaniaSvgComponent } from "../../../../shared/components/svgs/oceania-svg/oceania-svg.component";
import { AsiaSvgComponent } from "../../../../shared/components/svgs/asia-svg/asia-svg.component";
import { AfricaSvgComponent } from "../../../../shared/components/svgs/africa-svg/africa-svg.component";
import { AmericaSvgComponent } from "../../../../shared/components/svgs/america-svg/america-svg.component";
import { AntarticaSvgComponent } from "../../../../shared/components/svgs/antartica-svg/antartica-svg.component";

@Component({
  selector: 'country-information-continent',
  imports: [
    EuropaSvgComponent,
    OceaniaSvgComponent,
    AsiaSvgComponent,
    AfricaSvgComponent,
    AmericaSvgComponent,
    AntarticaSvgComponent
],
  templateUrl: './country-information-continent.component.html',
})
export class CountryInformationContinentComponent {


  public continents = input.required<string[]>();



}
