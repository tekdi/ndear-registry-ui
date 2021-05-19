import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { StudentLoginComponent } from './components/student/student-login/student-teacher-login.component';
import { StudentSignupComponent } from './components/student/student-signup/student-teacher-signup.component';
import { VerificationComponent } from './components/verification/verification.component';
import { TestComponent } from './test/test.component';
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
import { ConsentLoginComponent } from './components/diksha/consent-login/consent-login.component';
import { DikshaComponent } from './components/diksha/diksha/diksha.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'verification', component: VerificationComponent },

  { path: 'student-signup', component: StudentSignupComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'student-profile', component: StudentProfileComponent },

  { path: 'teacher-profile', component: TeacherProfileComponent },

  { path: 'institute-signup', component: InstituteSignupComponent },
  { path: 'institute-login', component: InstituteLoginComponent },
  { path: 'institute-profile', component: InstituteProfileComponent },
  { path: 'institute-profile-setup', component: InstituteProfileSetupComponent },
  { path: 'admin-institute-setup', component: AdminInstituteSetupComponent },
  { path: 'institute-attestation', component: InstituteAttestationsComponent },
  { path: 'institute-attestation-detail/:id', component: InstituteAttestationDetailComponent },
  { path: 'institute-teachers', component: InstituteTeachersComponent },

  { path: 'test', component: TestComponent },
  { path: 'mail', component: MailComponent },
  { path: 'teacher-invite', component: TeacherMailComponent },
  { path: 'consent-login', component: ConsentLoginComponent },
  { path: 'diksha', component: DikshaComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
