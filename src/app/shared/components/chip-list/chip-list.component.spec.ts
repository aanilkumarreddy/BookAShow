import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../core/material-module/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListComponent } from './chip-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChipListComponent', () => {
  let component: ChipListComponent;
  let fixture: ComponentFixture<ChipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListComponent);
    component = fixture.componentInstance;
    component.fieldCtrl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test onRemoveChip method ', () => {
    let select: any;
    select = {
      writeValue: () => {
        return {};
      },
      value: 'kjg',
    };
    component.fieldCtrl.patchValue(['Telugu']);
    expect(component.onRemoveChip).toBeDefined();
    spyOn(component, 'onRemoveChip').and.callThrough();
    component.onRemoveChip(select, 0);
    expect(component.onRemoveChip).toHaveBeenCalled();
  });
  it('Sholud test onSelectChange method ', () => {
    let event: any;
    event = {
      writeValue: () => {
        return {};
      },
      value: 'kjg',
    };
    component.fieldCtrl.patchValue(['Telugu']);
    expect(component.onSelectChange).toBeDefined();
    spyOn(component, 'onSelectChange').and.callThrough();
    component.onSelectChange(event);
    expect(component.onSelectChange).toHaveBeenCalled();
  });
  it('Sholud test onSelectChange method ', () => {
    let event: any;
    event = {
      writeValue: () => {
        return {};
      },
      value: 'kjg',
    };
    component.fieldCtrl.patchValue(['Telugu']);
    component.isSingleSelect = true;
    expect(component.onSelectChange).toBeDefined();
    spyOn(component, 'onSelectChange').and.callThrough();
    component.onSelectChange(event);
    expect(component.onSelectChange).toHaveBeenCalled();
  });
});
