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
import { MailComponent } from './components/mail/mail.component';
import { AdminInstituteSetupComponent } from './components/institute/admin/admin-institute-setup/admin-institute-setup.component';
import { InstituteAttestationsComponent } from './components/institute/institute-attestations/institute-attestations.component';
import { InstituteAttestationDetailComponent } from './components/institute/institute-attestation-detail/institute-attestation-detail.component';
import { InstituteTeachersComponent } from './components/institute/institute-teachers/institute-teachers.component';
import { TeacherMailComponent } from './components/mail/teacher-mail/teacher-mail.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';

import { ConsentLoginComponent } from './components/diksha/consent-login/consent-login.component';
import { DikshaComponent } from './components/diksha/diksha/diksha.component';

import { StudentMailComponent } from './components/mail/student-mail/student-mail.component';
import { InstiituteStudentsComponent } from './components/institute/instiitute-students/instiitute-students.component';
import { InstituteMailComponent } from './components/mail/institute-mail/institute-mail.component';
import { InstituteProfileSelectComponent } from './components/institute/institute-profile-select/institute-profile-select.component';
import { BoardInstitutesComponent } from './components/board/board-institutes/board-institutes.component';
import { InstituteConsentComponent } from './components/institute/institute-consent/institute-consent.component';
import { BoardLoginComponent } from './components/board/board-login/board-login.component';
import { BoardAttestationsComponent } from './components/board/board-attestations/board-attestations.component';
import { ConsentAuthorizeComponent } from './components/diksha/consent-authorize/consent-authorize.component';
import { ConsentVerificationComponent } from './components/diksha/consent-verification/consent-verification.component';
import { TeacherConsentComponent } from './components/teacher/teacher-consent/teacher-consent.component';
import { BoardAttestationDetailsComponent } from './components/board/board-attestation-details/board-attestation-details.component';

import { AuthGuard } from '../app/utility/app.guard';

const routes: Routes = [
  { path: 'signup', component: HomeComponent },
  { path: 'hod-mail', component: InstituteMailComponent },
  { path: 'verification', component: VerificationComponent },

  { path: 'student-signup', component: StudentSignupComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'student-profile', component: StudentProfileComponent },

  { path: 'teacher-profile', component: TeacherProfileComponent },
  { path: 'teacher-consent', component: TeacherConsentComponent },

  { path: 'institute-signup', component: InstituteSignupComponent },
  { path: 'institute-login', component: InstituteLoginComponent},
  { path: 'institute-profile', component: InstituteProfileComponent },
  { path: 'institute-profile-setup', component: InstituteProfileSetupComponent },
  { path: 'institute-profile-select', component: InstituteProfileSelectComponent },
  { path: 'admin-institute-setup', component: AdminInstituteSetupComponent },
  { path: 'institute-attestation', component: InstituteAttestationsComponent },
  { path: 'institute-attestation-detail/:id', component: InstituteAttestationDetailComponent },
  { path: 'institute-consent', component: InstituteConsentComponent },
  { path: 'institute-teachers', component: InstituteTeachersComponent },
  { path: 'institute-students', component: InstiituteStudentsComponent },

  { path: '', component: BoardLoginComponent , canActivate: [AuthGuard] },
  { path: 'board-institutes', component: BoardInstitutesComponent, canActivate: [AuthGuard]  },
  { path: 'board-attestation', component: BoardAttestationsComponent },
  { path: 'board-attestation-detail', component: BoardAttestationDetailsComponent },

  { path: 'test', component: TestComponent },
  { path: 'admin-mail', component: MailComponent },
  { path: 'teacher-invite', component: TeacherMailComponent },

  { path: 'consent-login', component: ConsentLoginComponent },
  { path: 'diksha', component: DikshaComponent },

  { path: 'student-invite', component: StudentMailComponent },
  { path: 'board-search', component: BoardInstitutesComponent },
  { path: 'consent-auth', component: ConsentAuthorizeComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
