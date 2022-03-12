import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDialogComponent } from './patient-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [PatientDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    NgxMaskModule,
  ],
  exports: [PatientDialogComponent],
  entryComponents: [PatientDialogComponent],
  providers: [PatientDialogComponent]
})
export class PatientDialogModule { }
