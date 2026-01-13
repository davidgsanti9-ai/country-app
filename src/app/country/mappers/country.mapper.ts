import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {

  static restCountryToCountry( restCountry: RESTCountry ): Country {

    return {
      name: restCountry.translations['spa'].common ?? 'No tiene nombre en español',
      capital: restCountry.capital ? restCountry.capital.join(',') : 'Sin capital',
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      population: restCountry.population,
      svg: restCountry.flags.svg,
      continents: restCountry.continents ? restCountry.continents : [],
      officialName: restCountry.name.official,
    }



  }


  static restCountryArrayToCountryArray( restCountries: RESTCountry[] ): Country[] {

    return restCountries.map( CountryMapper.restCountryToCountry );

  }




}






