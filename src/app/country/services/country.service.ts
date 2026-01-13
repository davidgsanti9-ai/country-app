import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Region } from '../types/regiones.type';


const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // ----- INICIALIZACIÓN DE VARIABLES ----
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  // ----------------- FUNCION PARA TRAER LOS DATOS POR CAPITAL ---------------------

  public searchByCapital(query: string): Observable<Country[]> {

    query = query.toLocaleLowerCase();

    console.log( this.queryCacheCapital );


    if ( this.queryCacheCapital.has(query) ) {
      return of( this.queryCacheCapital.get(query) ?? []);
    }



    console.log(`Llegando al servidor por ${ query }`);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(

      //  Transformar dato
      map(CountryMapper.restCountryArrayToCountryArray),
      tap( countries => { this.queryCacheCapital.set( query, countries ) }),

      // Manejar el error
      catchError(error => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`))
      })
    )

  }

  // ----------------- FUNCION PARA TRAER LOS DATOS POR NOMBRE DE PAÍS ---------------------

  public searchByCountry(query: string): Observable<Country[]> {

    query = query.toLocaleLowerCase();

    console.log( this.queryCacheCountry );

    if ( this.queryCacheCountry.has( query ) ) {
      return of( this.queryCacheCountry.get( query ) ?? [] );
    }


    console.log(`Llegando al servidor por ${ query }`);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(

      // Transformar los datos
      map(CountryMapper.restCountryArrayToCountryArray),
      tap( countries => this.queryCacheCountry.set( query, countries ) ),
      // Relentizar por un tiempo
      delay(3000),

      //Manejar el errro
      catchError(error => {
        console.log('Error en obtener por nombre de país', error);

        return throwError(() => new Error(`No se obtuvieron países con ese nombre: ${query}`))
      })
    )


  }


  // ----------------- FUNCION PARA TRAER LOS DATOS POR CÓDIGO DEL PAÍS ---------------------

  public searchByAlphaCode(code: string): Observable<Country | null> {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(

      // Transformar los datos
      map(CountryMapper.restCountryArrayToCountryArray),

      delay(2000),

      // Regresar el primer elemento ya que solo habria un pais por codigo
      map((countries) => countries.at(0) ?? null),

      //Manejar el errro
      catchError(error => {
        console.log('Error en obtener por nombre de país', error);

        return throwError(() => new Error(`No se obtuvieron países con ese código: ${code}`))
      }),

    )


  }



    // ----------------- FUNCION PARA TRAER LOS DATOS POR REGIÓN ---------------------

  public searchByRegion(region: string): Observable<Country[]> {

    if ( this.queryCacheRegion.has( region ) ) {
      return of ( this.queryCacheRegion.get( region ) ?? [] );
    }

    console.log(`Llegando al servidor por ${ region }`);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map(CountryMapper.restCountryArrayToCountryArray),
      tap( countries => { this.queryCacheRegion.set( region, countries ) } ),

      catchError(error => {
        console.log('Error en obtener paises por region', error);
        return throwError(() => new Error(`No se obtuvieron países de la region: ${region}`))
      }),

    )


  }







}



