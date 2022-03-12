import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { take, takeUntil } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { PatientDialogComponent } from '../components/patient-dialog/patient-dialog.component';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../store';
import { PatientState } from '../store/patient-portal.state';
import { AddPatient, EditPatient, RemovePatient } from '../store/patient-portal.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns = ['patientName', 'address', 'clinic'];
  sortedPatientData;

  clinicOptions = [
    'Atlanta Clinic 1',
    'Atlanta Clinic 2',
    'NCal Clinic 1',
    'NCal Clinic 2',
    'SCal Clinic 1',
    'SCal Clinic 2'
  ];

  private destroyed = new Subject();

  constructor(public dialog: MatDialog,
              private store: Store,
              private overlay: Overlay) { }

  ngOnInit(): void {
    this.store.select(PatientState.getPatients)
      .pipe(takeUntil(this.destroyed))
      .subscribe(data => {
        if (data) {
          this.sortedPatientData = new MatTableDataSource<Patient>(data);
          if (data.length > 0) {
            this.sortData({
              active: 'patientName',
              direction: 'asc'
            });
          }
        }
      });
  }

  sortData(sort: Sort) {
    const data = this.sortedPatientData.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedPatientData = new MatTableDataSource<Patient>(data);
      return;
    }

    this.sortedPatientData = new MatTableDataSource<Patient>(
      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'patientName':
            return this.compare(a.patientName?.toLowerCase(), b.patientName?.toLowerCase(), isAsc);
          case 'clinic':
            return this.compare(a.clinic?.toLowerCase(), b.clinic?.toLowerCase(), isAsc);
          default:
            return 0;
        }
      })
    );
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  addPatient(): void {
    const dialogRef = this.openPatientDialog({clinicOptions: this.clinicOptions, actionType: 'add', canEdit: true});
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((action: any) => {
        if (action && action.actionText === 'submit') {
          action.newPatientData.patientId = this.sortedPatientData.filteredData.length + 1;
          this.store.dispatch(new AddPatient(action.newPatientData));
        }
      });
  }

  editPatient(patient: Patient): void {
    const dialogRef = this.openPatientDialog({clinicOptions: this.clinicOptions, actionType: 'edit', canEdit: true, patient});
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((action: any) => {
        if (action && action.actionText === 'submit') {
          action.newPatientData.patientId = patient.patientId;
          this.store.dispatch(new EditPatient(action.newPatientData));
        }
      });
  }

  viewPatient(patient: Patient): void {
    this.openPatientDialog({actionType: 'view', canEdit: false, patient});
  }

  deletePatient(patient: Patient): void {
    this.store.dispatch(new RemovePatient(patient));
  }

  openPatientDialog(data: any): MatDialogRef<PatientDialogComponent> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop(); // this is necessary to suppress the vscrollbar
    dialogConfig.data = data;

    return this.dialog.open(PatientDialogComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
