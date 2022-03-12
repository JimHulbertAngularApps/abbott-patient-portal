import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PatientState } from './store/patient-portal.state';
import { NgxsModule } from '@ngxs/store';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgxMaskModule } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { PatientDialogModule } from './components/patient-dialog/patient-dialog.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    NgIdleKeepaliveModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxsModule.forRoot([PatientState]),
    PatientDialogModule,
    RouterModule,
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
