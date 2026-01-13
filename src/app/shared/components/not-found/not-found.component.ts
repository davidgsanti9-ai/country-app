import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'shared-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {


  public location = inject( Location );


  public goBack(): void {
    this.location.back();
  }


}
