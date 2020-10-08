import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';

/**
 * <app-chip-list
 * [fieldCtrl]="fieldCtrl"
 * [autoCompleteValues]="autoCompleteValues"
 * [chipValues]="[]"
 * [placeholder]="placeholder"
 * ></app-chip-list>
 */
@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent implements OnInit {
  @Input() fieldCtrl: FormControl;

  @Input() autoCompleteValues: any[];

  @Input() placeholder: string;

  @Input() normalClass: string;

  @Input() mobileClass: string;

  @Input() isSingleSelect: boolean;

  @Input('chipValues') set updateChipValues(chips: any[]) {
    const formValue = [];
    if ((chips || []).length > 0) {
      chips.forEach((chip) => {
        if (this.autoCompleteValues.indexOf(chip) > 0) {
          formValue.push(chip);
        }
      });
      this.fieldCtrl.patchValue(formValue);
    }
  }

  constructor() {}

  ngOnInit(): void {}

  onRemoveChip(multiSelect: MatSelect, matChipIndex: number): void {
    const selectedFruits = [...this.fieldCtrl.value];
    selectedFruits.splice(matChipIndex, 1);
    this.fieldCtrl.patchValue(selectedFruits);
    multiSelect.writeValue(selectedFruits);
  }

  onSelectChange(event: MatSelectChange): void {
    let formValues = [];
    if (this.isSingleSelect) {
      formValues.push(event.value);
    } else {
      formValues = event.value;
    }
    this.fieldCtrl.patchValue(formValues);
  }
}
