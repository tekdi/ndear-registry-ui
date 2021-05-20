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
import { InstituteAttestationsComponent } from './components/institute/institute-attestations/institute-attestations.component';
import { InstituteAttestationDetailComponent } from './components/institute/institute-attestation-detail/institute-attestation-detail.component';
import { InstituteTeachersComponent } from './components/institute/institute-teachers/institute-teachers.component';
import { TeacherMailComponent } from './test/mail/teacher-mail/teacher-mail.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';

import { AdminFormService } from '../app/services/admin-form.service';
import { ConsentLoginComponent } from './components/diksha/consent-login/consent-login.component';
import { DikshaComponent } from './components/diksha/diksha/diksha.component';

import { InstiituteStudentsComponent } from './components/institute/instiitute-students/instiitute-students.component';
import { StudentMailComponent } from './test/mail/student-mail/student-mail.component';
import { InstituteMailComponent } from './test/mail/institute-mail/institute-mail.component';
import { InstituteProfileSelectComponent } from './components/institute/institute-profile-select/institute-profile-select.component';
import { BoardLoginComponent } from './components/board/board-login/board-login.component';
import { BoardProfileComponent } from './components/board/board-profile/board-profile.component';
import { BoardAttestationsComponent } from './components/board/board-attestations/board-attestations.component';
import { BoardInstitutesComponent } from './components/board/board-institutes/board-institutes.component';
import { BoardRolesComponent } from './components/board/board-roles/board-roles.component';


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
    InstituteProfileSelectComponent,
    MailComponent,
    AdminInstituteSetupComponent,
    InstituteAttestationsComponent,
    InstituteAttestationDetailComponent,
    InstituteTeachersComponent,
    TeacherMailComponent,
    TeacherProfileComponent,
    ConsentLoginComponent,
    DikshaComponent,

    InstiituteStudentsComponent,
    StudentMailComponent,
    InstituteMailComponent,
    BoardLoginComponent,
    BoardProfileComponent,
    BoardAttestationsComponent,
    BoardInstitutesComponent,
    BoardRolesComponent,

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
  ],
  schemas: [],
  entryComponents: [],
  bootstrap: [AppComponent],
  providers: [ AdminFormService]
})
export class AppModule {
}
