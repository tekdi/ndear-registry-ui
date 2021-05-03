import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentTeacherSignupComponent } from './components/student-teacher-signup/student-teacher-signup.component';
import { AppRoutingModule } from './app-routing.module';
import { MdbModule } from 'mdb-angular-ui-kit';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './components/verification/verification.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentTeacherLoginComponent } from './components/student-teacher-login/student-teacher-login.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentTeacherSignupComponent,
    HeaderComponent,
    VerificationComponent,
    StudentProfileComponent,
    StudentTeacherLoginComponent
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
    NgOtpInputModule
  ],
  schemas: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
