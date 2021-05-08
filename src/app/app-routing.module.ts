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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'verification', component: VerificationComponent },

  { path: 'student-signup', component: StudentSignupComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'student-profile', component: StudentProfileComponent },

  { path: 'institute-signup', component: InstituteSignupComponent },
  { path: 'institute-login', component: InstituteLoginComponent },
  { path: 'institute-profile', component: InstituteProfileComponent },
  { path: 'institute-profile-setup', component: InstituteProfileSetupComponent },

  { path: 'test', component: TestComponent },
  { path: 'mail', component: MailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
