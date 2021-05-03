import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentTeacherLoginComponent } from './components/student-teacher-login/student-teacher-login.component';
import { StudentTeacherSignupComponent } from './components/student-teacher-signup/student-teacher-signup.component';
import { VerificationComponent } from './components/verification/verification.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'student-teacher-signup', component: StudentTeacherSignupComponent },
  { path: 'student-teacher-login', component: StudentTeacherLoginComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'student-profile', component: StudentProfileComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
