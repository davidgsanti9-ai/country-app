import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  public placeholder = input.required<string>();
  public inputSearch = output<string>();
  public debunceTime = input<number>(2000);
  public initialValue = input<string>('');

  public inputValue = linkedSignal<string>( () => this.initialValue() ?? '');

  debounceEffect = effect(( onCleanup )=> {

    const value = this.inputValue();

    const timeout = setTimeout(()=> {
      this.inputSearch.emit( value );
    }, this.debunceTime());


    onCleanup(()=>{
      clearTimeout(timeout);
    })



  })


  public onSearch( value: string ): void {
    if( value.trim() !== '' ) {
      this.inputSearch.emit( value.trim() );
    }
  }


}
