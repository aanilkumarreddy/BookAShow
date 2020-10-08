import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { DISTANCE } from './../../../constants/distance.constant';
import { GENRES } from './../../../constants/genres.constant';
import { LANGUAGES } from './../../../constants/languages.constant';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filterForm: FormGroup;

  languages = LANGUAGES;
  genres = GENRES;
  distances = DISTANCE;
  constructor() {}

  ngOnInit(): void {}
}
