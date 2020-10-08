import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieWrapperService {
  constructor(private datePipe: DatePipe) {}

  createMovieObj(movieForm: FormGroup): any {
    const movieFormValue = movieForm.getRawValue();
    const fromDate = this.datePipe.transform(((movieFormValue || {}).theater || {}).startDate, 'MM-dd-yyyy');
    const toDate = this.datePipe.transform(((movieFormValue || {}).theater || {}).endDate, 'MM-dd-yyyy');
    let movieName = (movieFormValue || {}).title;
    if (typeof movieName === 'object') {
      movieName = movieName.title;
    }
    return {
      title: movieName,
      sub_title: (movieFormValue || {}).sub_title,
      imdbId: (movieFormValue || {}).imdbId,
      genres: (movieFormValue || {}).genres,
      languages: (movieFormValue || {}).languages,
      story: (movieFormValue || {}).story,
      dynamicImageUrl: (movieFormValue || {}).poster_url,
      cast: this.getCastCrewArray((movieFormValue || {}).castArray),
      crew: this.getCastCrewArray((movieFormValue || {}).castArray),
      theater: {
        name: ((movieFormValue || {}).theater || {}).name,
        address: ((movieFormValue || {}).theater || {}).address,
        latitude: +((movieFormValue || {}).theater || {}).latitude,
        longitude: +((movieFormValue || {}).theater || {}).longitude,
        fromDate,
        toDate,
        showTimings: ((movieFormValue || {}).theater || {}).showTimings,
        restrictions: this.getArrayFromObjs(((movieFormValue || {}).theater || {}).restrictionsArray, 'restriction'),
        parking: ((movieFormValue || {}).theater || {}).parking,
        foodAvailability: ((movieFormValue || {}).theater || {}).foodAvailability,
        dolby: ((movieFormValue || {}).theater || {}).dolby,
        fourK: ((movieFormValue || {}).theater || {}).fourK,
      },
    };
  }

  getArrayFromObjs(array: [], property: string): string[] {
    const finalArr = [];
    array.forEach((val) => {
      finalArr.push(val[property]);
    });
    return finalArr;
  }

  getCastCrewArray(cast): any {
    const castArray = [];
    (cast || []).forEach((value) => {
      if (value.name) {
        castArray.push(value);
      }
    });
    return castArray;
  }
}
