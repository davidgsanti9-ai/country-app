import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../types/regiones.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam(queryParam: string): Region {

  queryParam = queryParam.toLocaleLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    america: 'Americas',
    asia: 'Asia',
    antarctic: 'Antarctic',
    europe: 'Europe',
    oceania: 'Oceania',
  };


  return validRegions[queryParam] ?? 'Americas';


}





@Component({
  standalone: true,
  selector: 'app-by-region-page',
  imports: [
    CountryListComponent,
    NgClass,
  ],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public countryService = inject(CountryService);
  public router = inject(Router);

  public activatedRoute = inject(ActivatedRoute);
  public queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  public regionSearch = linkedSignal<Region>(() =>  validateQueryParam(this.queryParam) );




  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];


  public regionResource = rxResource({
    request: () => ({ region: this.regionSearch() }),
    loader: ({ request }) => {

      if (!request.region) {
        return of([]);
      }

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: request.region
        }
      });

      return this.countryService.searchByRegion(request.region);

    }
  })



}
