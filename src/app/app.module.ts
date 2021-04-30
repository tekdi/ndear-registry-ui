import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { AppComponent } from './app.component';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';
import { HomeComponent } from './components/home/home.component';
import { StudentTeacherSignupComponent } from './components/student-teacher-signup/student-teacher-signup.component';
import { AppRoutingModule } from './app-routing.module';
import { MdbModule } from 'mdb-angular-ui-kit';


@NgModule({
  declarations: [
    AppComponent,
    CustomAutocompleteControlRenderer,
    LangComponent,
    DataDisplayComponent,
    HomeComponent,
    StudentTeacherSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModule,
    BrowserAnimationsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  schemas: [],
  entryComponents: [CustomAutocompleteControlRenderer, LangComponent, DataDisplayComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
