import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'formly-autocomplete-type',
  template: `
    <mat-form-field>
      <input matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder">
      <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let value of filter | async" [value]="value">
          {{ value }}
        </mat-option>
      </mat-autocomplete>

      <mat-error>
        <formly-validation-message [field]="field"></formly-validation-message>
      </mat-error>
      <mat-hint *ngIf="to.description">
        {{ to.description }}
      </mat-hint>
    </mat-form-field>
  `,
})
export class AutocompleteTypeComponent extends FieldType {
  filter: Observable<any>;

  ngOnInit() {
    this.filter = this.formControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(term => this.to.filter(term)),
      );
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */