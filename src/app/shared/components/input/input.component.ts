import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() fieldCtrl: FormControl;
  @Input() placeholder: string;
  @Input() appearance: string;
  @Input() label: string;
  @Input() normalClass: string;
  @Input() mobileClass: string;
  @Input() hint: string;

  constructor() {}

  ngOnInit(): void {}
}
