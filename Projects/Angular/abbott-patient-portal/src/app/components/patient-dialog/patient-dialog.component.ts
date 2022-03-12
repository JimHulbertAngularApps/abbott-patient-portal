import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Patient } from '../../store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.scss']
})

export class PatientDialogComponent implements OnInit, OnDestroy {
  dataForm: FormGroup;
  filteredClinicOptions: Observable<any[]>;

  private destroyed = new Subject();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required, Validators.minLength(2)]),
      zipcode: new FormControl('', [Validators.required, Validators.minLength(5)]),
      clinic: new FormControl('', [this.requireMatch.bind(this)]),
    });

    if (this.data.patient) {
      this.formControls.firstName.setValue(this.data.patient.firstName);
      this.formControls.lastName.setValue(this.data.patient.lastName);
      this.formControls.street.setValue(this.data.patient.street);
      this.formControls.city.setValue(this.data.patient.city);
      this.formControls.state.setValue(this.data.patient.state);
      this.formControls.zipcode.setValue(this.data.patient.zipcode);
      this.formControls.clinic.setValue(this.data.patient.clinic);
    }

    this.filteredClinicOptions = this.formControls.clinic.valueChanges
      .pipe(
        startWith(''),
        map(value => value),
        map(value => this._clinicFilter(value, this.data.clinicOptions))
      );

    if (this.data.patient && this.data.clinicOptions) {
      this.formControls.clinic.setValue(this.data.clinicOptions.find(value => value.toLowerCase() === this.data.patient.clinic.toLowerCase()));
    }

    if (!this.data.canEdit) {
      this.dataForm.disable();
    }
  }

  get formControls() {
    return this.dataForm ? this.dataForm.controls : undefined;
  }

  get dialogTitle(): string {
    const defaultTitle = 'Patient Details';
    switch (this.data.actionType) {
      case 'add':
        return `Add - ${defaultTitle}`;
      case 'edit':
        return `Edit - ${defaultTitle}`;
      case 'view':
        return `View - ${defaultTitle}`;
    }
  }
  _clinicFilter(searchValue: string, options: any[]): string[] {
    const filterClinicValue = searchValue.toLowerCase();
    return options?.filter(option => option.toLowerCase().includes(filterClinicValue));
  }


  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.data.clinicOptions && this.data.clinicOptions.findIndex(p => p === selection) < 0) {
      return { requireMatch: true };
    }
    return null;
  }

  formatData(): Patient {
    return {
      firstName: this.formControls.firstName.value,
      lastName: this.formControls.lastName.value,
      street: this.formControls.street.value,
      city: this.formControls.city.value,
      state: this.formControls.state.value,
      zipcode: this.formControls.zipcode.value,
      clinic: this.formControls.clinic.value,
    };
  }

  getCloseActionObject(action: string): any {
    return {
      actionText: action,
      newPatientData: this.formatData()
    };
  }

  ngOnDestroy(): void {
    this.destroyed.next;
    this.destroyed.complete();
  }
}
