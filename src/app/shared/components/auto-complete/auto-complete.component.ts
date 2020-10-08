import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit {
  @Input() autoCompleteValues: any[];
  @Input() fieldCtrl: FormControl;
  @Input() placeHolder: string;
  @Output() optionSelected = new EventEmitter();
  @Input() normalClass: string;
  @Input() mobileClass: string;

  constructor() {}

  ngOnInit(): void {}

  onSelect(ele): void {
    this.optionSelected.emit(ele);
  }

  displayTemplate(value): string {
    return (value || {}).title ? value.title : value;
  }
}
