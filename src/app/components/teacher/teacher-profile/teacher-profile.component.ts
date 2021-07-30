import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherProfileService } from '../../../services/teacher/teacher-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
import { KeycloakService } from 'keycloak-angular';

import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { SchemaService } from 'src/app/services/data/schema.service';


@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  header1: string = 'teacher';
  tab: string = 'profile';
  user;
  education;
  experience;
  institute
  editUserform: FormGroup;
  educationForm: FormGroup;
  model: NgbDateStruct;
  startdate: NgbDateStruct;
  enddate: NgbDateStruct;
  working: Boolean = true;
  teacherId: string;
  item: any;
  schemaJson: any;
  teacherSchema: any;
  educationSchema: any;
  experianceSchema: any;
  attested = "pending";

  form1: [
    "*",
    {
      "type": "submit",
      "style": "btn btn-primary text-end mt-3 fw-bold text-capitalize",
      "title": "save"
    }
  ]


  form: [
    '*',
    {
      "type": "submit",
      "style": "btn-info",
      "title": "save"
    }
  ]
  constructor(

    fb: FormBuilder,
    config: NgbInputDatepickerConfig,
    calendar: NgbCalendar,
    public router: Router,
    private route: ActivatedRoute,
    public teacherProfileService: TeacherProfileService,
    public toastMsg: ToastMessageService,
    public Schema: SchemaService,
    public keycloakService: KeycloakService) {

    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2020, month: 12, day: 31 };

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    this.Schema.getSchemas().subscribe((res) => {
      this.schemaJson = res;
      console.log("res", this.schemaJson.definitions.IdentityDetails);
     // delete this.schemaJson.definitions.ContactDetails.properties.address;


      delete this.schemaJson.definitions.Teacher.properties.experience;
      delete this.schemaJson.definitions.Teacher.properties.academicQualifications;

      this.teacherSchema = this.schemaJson.definitions.Teacher;

      // console.log(this.schema.definitions)
      /*    this.teacherSchema = {
            "type": "object",
            "title": "Teacher",
            "definitions": {
              "identityDetails": this.schemaJson.definitions.IdentityDetails,
              "contactDetails": this.schemaJson.definitions.ContactDetails,
             // "address" : this.schemaJson.definitions.Address
            },
            "properties": {
              "identityDetails": {
                "$ref": "#/definitions/identityDetails"
              },
              "contactDetails": {
                "$ref": "#/definitions/contactDetails"
              }
              // ,
              // "address": {
              //   "$ref": "#/definitions/address"
              // }
            }
          };
    */
      //this.teacherSchema.definitions.contactDetails.address =  this.schemaJson.definitions.Address;
      console.log('this.teacherSchema==>', this.teacherSchema);

      this.educationSchema = this.schemaJson.definitions.AcademicQualification;
      this.experianceSchema = this.schemaJson.definitions.ExperienceType;


      console.log('  this.educationSchema = > ', this.experianceSchema);

    });

    // setting datepicker popup to open above the input
    // config.placement = ['top-left', 'top-right'];
    // localStorage.setItem('is_logedin', "true")
    // localStorage.setItem('admin', 'false')

    // this.editUserform = fb.group({
    //   fullName: this.user.fullName,
    //   gaurdianfullName: this.user.gaurdianfullName,
    //   relation: this.user.relation,
    //   mobileEmail: this.user.mobileEmail,
    //   mobile: this.user.mobile,
    //   accepted: true,
    //   gender: this.user.gender,
    //   address: this.user.address,
    //   aadhaarNo: this.user.aadhaarNo,
    //   idType: this.user.idType,
    //   dob: this.user.dob
    // });

    this.education = JSON.parse(localStorage.getItem('education'))
    this.experience = JSON.parse(localStorage.getItem('experience'))
    this.educationForm = fb.group({
      institute: ['', Validators.required],
      working: [true],
      startdate: [{ 'day': '', 'month': '', 'year': '' }],
      enddate: [{ 'day': '', 'month': '', 'year': '' }],
      send: true,
      attested: false,
      consent: false
    });
  }

  onEditProfileSubmit(event) {
    // this.user.details = this.editform.value

    // this.router.navigate(['student-profile']);
    console.log({ event });

    // event.contactDetails.address = event.address;
    // delete event.address;

    //  if (this.teacherId && this.teacherId != "null") {

    event.osid = this.item.osid;
    this.teacherId = this.item.osid;

    if (this.item.hasOwnProperty('identityDetails')) {
      event.identityDetails.osid = this.item.identityDetails.osid;
    }

    if (this.item.hasOwnProperty('contactDetails')) {
      event.contactDetails.osid = this.item.contactDetails.osid;
    }

    // if(this.item.hasOwnProperty('address')){
    //   event.address.osid = this.item.address.osid;
    // }

    //let data = event; //this.editUserform.value;
    console.log('data event -> ', event);

    this.teacherProfileService.putTeacherProfile(event, this.teacherId).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        // this.router.navigate(['/teacher-profile', { 'id': this.teacherId }]);
        this.getTeacherData(this.teacherId);
        this.toastMsg.success('Success', 'Teacher Profile Updated Successfully');
      } else {
        this.toastMsg.error('Error', res.params.errmsg);
      }
    })

    // } else {



    const data = event;

    console.log('data event -> ', data);

    /* this.teacherProfileService.postTeacherProfile(data).subscribe(res => {
       if (res.responseCode == 'OK' && !res.params.errmsg) {
        // this.router.navigate(['/teacher-profile', { 'id': res.result.Teacher.osid }]);
         localStorage.setItem('teacherId', res.result.Teacher.osid);

         this.getTeacherData(res.result.Teacher.osid);
         this.toastMsg.success('Success', 'Teacher Profile Added Successfully');
       } else {
         this.toastMsg.error('Error', res.params.errmsg);
       }
     })*/
    // }


  }

  onSubmit() {

  }

  onEducationSubmit(event) {
    console.log(event);
    // this.user.details = this.editform.value
    this.attested = "pending"
    // event.note = "Attestation pending"
    // event.consent = false
    // this.education.push(event)
    //this.educationForm.reset();
    // this.education = this.educationForm.value
    this.teacherId = this.item.osid

    if (!this.item.hasOwnProperty('academicQualifications')) {
      this.item.academicQualifications = [
        event
      ]
    } else {
      this.item.academicQualifications.push(
        event
      );
    }

    this.teacherProfileService.addProperty(event, this.teacherId, 'academicQualifications').subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        this.teacherProfileService.getTeacherProfile(this.teacherId).subscribe((res) => {
          this.item = res[0];
          let self = this;
          this.toastMsg.success('Success', 'Academic Qualifications Deatils Added Successfully');

          for (let i = 0; i <= self.item.academicQualifications.length; i++) {

            console.log(self.item.academicQualifications[i]._osState);
            if (self.item.academicQualifications[i]._osState == 'DRAFT') {
              this.sendVerification(this.teacherId, self.item.academicQualifications[i].osid, 'academicQualifications');
              this.getTeacherData(this.teacherId);
            }
          }

        })
      }
    })

  }

  onExperienceSubmit(event) {
    console.log(event);
    attested: "pending"

    //event.osid = this.item.osid;
    this.teacherId = this.item.osid

    if (!this.item.hasOwnProperty('experience')) {
      this.item.experience = [
        event
      ]
    } else {
      this.item.experience.push(
        event
      );
    }

    this.teacherProfileService.addProperty(event, this.teacherId, 'experience').subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        this.teacherProfileService.getTeacherProfile(this.teacherId).subscribe((res) => {
          this.item = res[0];
          let self = this;
          this.toastMsg.success('Success', 'Experience data added successfully');

          for (let i = 0; i <= self.item.experience.length; i++) {

            console.log(self.item.experience[i]._osState);
            if (self.item.experience[i]._osState == 'DRAFT') {
              this.sendVerification(this.teacherId, self.item.experience[i].osid, 'experience');
              this.getTeacherData(this.teacherId);
            }
          }

        })
      }
    })

    this.educationForm.reset();
    // this.education = this.educationForm.value
  }

  ngOnInit(): void {
    // if (localStorage.getItem('institute-detail')) {
    //   this.institute = JSON.parse(localStorage.getItem('institute-detail')).BasicDetails.instituteName;
    //   this.experianceSchema.properties.institute.enum.push(this.institute)
    //   this.educationSchema.properties.institute.enum.push(this.institute)
    // }

    this.user = this.keycloakService.getUsername();
    this.keycloakService.getToken().then((token) => {
      console.log('keyCloak teacher token - ', token);
      localStorage.setItem('token', token);
      localStorage.setItem('loggedInUser', this.user)
    });

    this.route.params.subscribe(params => {
      console.log("route", params)
      this.teacherId = params['id'];
      // this.teacherId = ( this.teacherId)?  this.teacherId : localStorage.getItem('teacherId');

    });

    this.getTeacherData(this.teacherId);
  }

  getTeacherData(id) {

    // if (id && id != "null") {
    this.teacherProfileService.getTeacherProfile(id).subscribe((res) => {
      this.item = res[0];
    })
    //}
  }

  onWorkingChange() {
    console.log(this.educationForm.value.working)
    this.working = this.educationForm.value.working;
  }

  modelchange(id) {
    console.log(id)
    this.education[id] = this.educationForm
  }

  sendVerification(entityId, propertyId, property) {
    this.teacherProfileService.sendAttestedTeacherProperty(entityId, propertyId, property).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        // localStorage.setItem('student_id', res.result.Student.osid);
        //  this.router.navigate(['/student-profile', { 'id': this.studentId }]);

        this.getTeacherData(this.teacherId);
      } else {
        this.toastMsg.error('Error', res.params.errmsg);
      }
    })
  }

}
