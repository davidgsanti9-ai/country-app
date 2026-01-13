import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-by-capital-page',
  imports: [
    SearchInputComponent,
    CountryListComponent,
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  public countryService = inject( CountryService );
  public router = inject( Router );

  //Inyectar la ruta activa, con todas sus proterties
  public activatedRoute = inject( ActivatedRoute );
  public queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  // public query = signal<string>(this.queryParam);
  public query = linkedSignal<string>( () => this.queryParam );

  public countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {

      console.log({ query: request.query });

      if ( !request.query ) return of([]);


      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query,
          hola: 'mundo'
        }
      });



      return this.countryService.searchByCapital( request.query )

    }
  })


  // ------- RESOURCE TRANSFORMANDO EL OBSERVABLE A PROMESA ---------
  // public countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {

  //     if ( !request.query ) return [];

  //     // Transformar el observable en una promesa
  //     return await firstValueFrom( this.countryService.searchByCapital(request.query) )

  //   }
  // })


  // isLoading = signal<boolean>( false );
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);



  // onSearch( query: string ): void {

  //   if (this.isLoading() ) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);


  //   this.countryService.searchByCapital( query ).subscribe(
  //     {
  //       next: (countries) => {

  //         this.isLoading.set(false);
  //         this.countries.set( countries );

  //       },
  //       error: (error) => {

  //         this.isLoading.set( false );
  //         this.countries.set([]);
  //         this.isError.set( error );

  //       }
  //     }

  //   );

  // }


}
