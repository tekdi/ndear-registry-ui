import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentTeacherSignupComponent } from './components/student-teacher-signup/student-teacher-signup.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'student-teacher-signup', component: StudentTeacherSignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
