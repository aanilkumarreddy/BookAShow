import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [StarRatingComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCqrBM1a2zD-EUDXgUFRywhREZYpjPuI6A',
    }),
  ],
  exports: [FlexLayoutModule, AgmCoreModule],
})
export class SharedModule {}
