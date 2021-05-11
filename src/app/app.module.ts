import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentSignupComponent } from './components/student/student-signup/student-teacher-signup.component';
import { AppRoutingModule } from './app-routing.module';
import { MdbModule } from 'mdb-angular-ui-kit';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './components/verification/verification.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { StudentLoginComponent } from './components/student/student-login/student-teacher-login.component';
import { TestComponent } from './test/test.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SuiModule} from 'ng2-semantic-ui';
// import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';
import { InstituteSignupComponent } from './components/institute/institute-signup/institute-signup.component';
import { InstituteLoginComponent } from './components/institute/institute-login/institute-login.component';
import { InstituteProfileComponent } from './components/institute/institute-profile/institute-profile.component';
import { InstituteProfileSetupComponent } from './components/institute/institute-profile-setup/institute-profile-setup.component';
import { MailComponent } from './test/mail/mail.component';
import { AdminInstituteSetupComponent } from './components/institute/admin/admin-institute-setup/admin-institute-setup.component'; 
import {
  SchemaFormModule,
  WidgetRegistry,
  DefaultWidgetRegistry,
} from "ngx-schema-form";
import { InstituteAttestationsComponent } from './components/institute/institute-attestations/institute-attestations.component';
import { InstituteAttestationDetailComponent } from './components/institute/institute-attestation-detail/institute-attestation-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomeComponent,
    HeaderComponent,
    VerificationComponent,
    StudentSignupComponent,
    StudentProfileComponent,
    StudentLoginComponent,
    InstituteSignupComponent,
    InstituteLoginComponent,
    InstituteProfileComponent,
    InstituteProfileSetupComponent,
    MailComponent,
    AdminInstituteSetupComponent,
    InstituteAttestationsComponent,
    InstituteAttestationDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    NgbModule,
    SuiModule,
    // MaterialDesignFrameworkModule,
    Bootstrap4FrameworkModule,
    SchemaFormModule.forRoot()
  ],
  schemas: [],
  entryComponents: [],
  bootstrap: [AppComponent],
  providers: [{ provide: WidgetRegistry, useClass: DefaultWidgetRegistry }]
})
export class AppModule {
}
