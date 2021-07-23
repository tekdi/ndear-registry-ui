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
import { MailComponent } from './components/mail/mail.component';
import { AdminInstituteSetupComponent } from './components/institute/admin/admin-institute-setup/admin-institute-setup.component'; 
import { InstituteAttestationsComponent } from './components/institute/institute-attestations/institute-attestations.component';
import { InstituteAttestationDetailComponent } from './components/institute/institute-attestation-detail/institute-attestation-detail.component';
import { InstituteTeachersComponent } from './components/institute/institute-teachers/institute-teachers.component';
import { TeacherMailComponent } from './components/mail/teacher-mail/teacher-mail.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';
import { ConsentLoginComponent } from './components/diksha/consent-login/consent-login.component';
import { DikshaComponent } from './components/diksha/diksha/diksha.component';
import { InstiituteStudentsComponent } from './components/institute/instiitute-students/instiitute-students.component';
import { StudentMailComponent } from './components/mail/student-mail/student-mail.component';
import { InstituteMailComponent } from './components/mail/institute-mail/institute-mail.component';
import { InstituteProfileSelectComponent } from './components/institute/institute-profile-select/institute-profile-select.component';
import { BoardLoginComponent } from './components/board/board-login/board-login.component';
import { BoardProfileComponent } from './components/board/board-profile/board-profile.component';
import { BoardAttestationsComponent } from './components/board/board-attestations/board-attestations.component';
import { BoardInstitutesComponent } from './components/board/board-institutes/board-institutes.component';
import { BoardRolesComponent } from './components/board/board-roles/board-roles.component';
import { InstituteConsentComponent } from './components/institute/institute-consent/institute-consent.component';
import { ConsentAuthorizeComponent } from './components/diksha/consent-authorize/consent-authorize.component';
import { ConsentVerificationComponent } from './components/diksha/consent-verification/consent-verification.component';
import { TeacherConsentComponent } from './components/teacher/teacher-consent/teacher-consent.component';
import { BoardAttestationDetailsComponent } from './components/board/board-attestation-details/board-attestation-details.component';
import { TeacherSignupComponent } from './components/teacher/teacher-signup/teacher-signup.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { KeycloakloginComponent } from './components/keyCloak/keycloaklogin/keycloaklogin.component';
import { TeacherAttestationComponent } from './components/teacher/teacher-attestation/teacher-attestation/teacher-attestation.component';
import { TeacherAttestationDetailComponent } from './components/teacher/teacher-attestation-detail/teacher-attestation-detail/teacher-attestation-detail.component';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry,} from "ngx-schema-form";
import { ToastrModule } from 'ngx-toastr';
import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import {NgxPaginationModule} from 'ngx-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


import { MatMenuModule } from '@angular/material/menu';
// formly
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ArrayTypeComponent } from '../app/forms/types/array.type';
import { ObjectTypeComponent } from '../app/forms/types/object.type';
import { MultiSchemaTypeComponent } from '../app/forms/types/multischema.type';
import { NullTypeComponent } from '../app/forms/types/null.type';
import { AutocompleteTypeComponent } from '../app/forms/types/autocomplete.type';

export function minItemsValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT have fewer than ${field.templateOptions.minItems} items`;
}

export function maxItemsValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT have more than ${field.templateOptions.maxItems} items`;
}

export function minlengthValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT be shorter than ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT be longer than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field: FormlyFieldConfig) {
  return `should be >= ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field: FormlyFieldConfig) {
  return `should be <= ${field.templateOptions.max}`;
}

export function multipleOfValidationMessage(err, field: FormlyFieldConfig) {
  return `should be multiple of ${field.templateOptions.step}`;
}

export function exclusiveMinimumValidationMessage(err, field: FormlyFieldConfig) {
  return `should be > ${field.templateOptions.step}`;
}

export function exclusiveMaximumValidationMessage(err, field: FormlyFieldConfig) {
  return `should be < ${field.templateOptions.step}`;
}

export function constValidationMessage(err, field: FormlyFieldConfig) {
  return `should be equal to constant "${field.templateOptions.const}"`;
}


/* Service files */
import { BoardInstituteService} from './services/board/board-institutes/board-institutes.service';
import { AdminFormService } from './services/admin-form.service';

import { TeacherProfileService } from './services/teacher/teacher-profile.service';
import { StudentProfileService} from './services/student/student-profile.service';
import { InviteService} from './services/invite/invite.service';
import { DiscoveryService } from './services/discovery/discovery.service';
import { initializeKeycloak } from '../app/utility/app.init';
import { AttestationService } from './services/attestation/attestation.service';

import { FormsComponent } from './forms/forms.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ModalRouterEditLinkDirective } from '../app/layouts/modal/modal.directive';
import { ModalRouterAddLinkDirective } from '../app/layouts/modal/modal.directive';
import { Test2Component } from './test/test2/test2.component';

import { PanelsComponent } from './layouts/modal/panels/panels.component';
import { EditPanelComponent } from './layouts/modal/panels/edit-panel/edit-panel.component';
import { AddPanelComponent } from './layouts/modal/panels/add-panel/add-panel.component';
import { TablesComponent } from './tables/tables.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



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
    InstituteConsentComponent,
    ConsentAuthorizeComponent,
    ConsentVerificationComponent,
    TeacherConsentComponent,
    BoardAttestationDetailsComponent,

    TeacherSignupComponent,
    DiscoveryComponent,
    KeycloakloginComponent,

    TeacherAttestationComponent,
    TeacherAttestationDetailComponent,


    FormsComponent,
    ArrayTypeComponent,
    ObjectTypeComponent,
    MultiSchemaTypeComponent,
    NullTypeComponent,
    LayoutsComponent,
    ModalRouterEditLinkDirective,
    ModalRouterAddLinkDirective,
    Test2Component,
    PanelsComponent, EditPanelComponent, AddPanelComponent, TablesComponent,
    AutocompleteTypeComponent


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

    KeycloakAngularModule,
    MatAutocompleteModule,

    AutocompleteLibModule,
    FormlyBootstrapModule,
    MatMenuModule,
    NgSelectModule,
    FormlyModule.forRoot({
      extras: { resetFieldOnHide: true },
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        
      ],
      types: [
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'enum', extends: 'select' },
        { name: 'null', component: NullTypeComponent, wrappers: ['form-field'] },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
        {
          name: 'autocomplete',
          component: AutocompleteTypeComponent,
          wrappers: ['form-field'],
        }
      ],
    }),

    // MaterialDesignFrameworkModule,

    Bootstrap4FrameworkModule,
    SchemaFormModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
    preventDuplicates: true,
    }),
    NgxPaginationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [Test2Component],
  bootstrap: [AppComponent],
  providers: [ 
    { provide: WidgetRegistry, useClass: DefaultWidgetRegistry },
    AdminFormService,
    BoardInstituteService,
    TeacherProfileService,
    StudentProfileService,
    InviteService,
    DiscoveryService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    AttestationService
    
  ]
})
export class AppModule {
}
