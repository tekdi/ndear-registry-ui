import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherProfileService } from '../../../services/teacher/teacher-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
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
    public Schema: SchemaService) {

    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2020, month: 12, day: 31 };

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    this.Schema.getSchemas().subscribe((res) => {
      this.schemaJson = res;
      console.log("res", this.schemaJson.definitions.IdentityDetails);

      // console.log(this.schema.definitions)
      this.teacherSchema = {
        "type": "object",
        "title": "Teacher",
        "definitions": {
          "identityDetails": this.schemaJson.definitions.IdentityDetails,
          "contactDetails": this.schemaJson.definitions.ContactDetails,
        },
        "properties": {
          "identityDetails": {
            "$ref": "#/definitions/identityDetails"
          },
          "contactDetails": {
            "$ref": "#/definitions/contactDetails"
          }
        }
      };

      this.educationSchema = this.schemaJson.definitions.AcademicQualification;
      this.experianceSchema = this.schemaJson.definitions.ExperienceType;


      console.log('  this.educationSchema = > ', this.experianceSchema);

    });

    // setting datepicker popup to open above the input
    // config.placement = ['top-left', 'top-right'];
    localStorage.setItem('is_logedin', "true")
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

    if (this.teacherId) {

      event.osid = this.teacherId;
      event.identityDetails.osid = this.item.identityDetails.osid;
      event.contactDetails.osid = this.item.contactDetails.osid;
      const data = event; //this.editUserform.value;
      this.teacherProfileService.putTeacherProfile(data, this.teacherId).subscribe(res => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          this.router.navigate(['/teacher-profile', { 'id': this.teacherId }]);
          this.getTeacherData(this.teacherId);
          this.toastMsg.success('Success', 'Teacher Profile Updated Successfully');
        } else {
          this.toastMsg.error('Error', res.params.errmsg);
        }
      })

    }else{
      const data = event;

      this.teacherProfileService.postTeacherProfile(data).subscribe(res => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          this.router.navigate(['/teacher-profile', { 'id': res.result.Teacher.osid }]);
  
          this.getTeacherData(res.result.Teacher.osid);
          this.toastMsg.success('Success', 'Teacher Profile Added Successfully');
        }else{
          this.toastMsg.error('Error', res.params.errmsg);
        }
      })
    }

   
  }

  onSubmit() {

  }

  onEducationSubmit(event) {
    console.log(event);
    // this.user.details = this.editform.value
   // event.attested = "pending"
    // event.note = "Attestation pending"
    // event.consent = false
   // this.education.push(event)
    //this.educationForm.reset();
    // this.education = this.educationForm.value

    if (!this.item.hasOwnProperty('academicQualifications')) {
      this.item.academicQualifications = [
        event
      ]
    } else {
      this.item.academicQualifications.push(
        event
      );
    }

    this.teacherProfileService.putTeacherProfile(this.item, this.teacherId).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        // localStorage.setItem('student_id', res.result.Student.osid);
        this.router.navigate(['/teacher-profile', { 'id': this.teacherId }]);
        this.getTeacherData(this.teacherId);
        this.toastMsg.success('Success', 'Academic Qualifications Deatils Added Successfully');
      }
    })

  }

  onExperienceSubmit(event) {
    console.log(event);
 
    /*
    EmploymentType: "Permanant"
TeacherType: "Assistant teacher UPS Head teacher primary school"
attested: "pending"
enddate: "2040-01-12"
institute: "Sarvoday School"
send: true
startdate: "2000-02-12"
__proto__: Object
*/

    // const data = {
    //   "experience": [
    //     {
    //       "institute": event.institute,
    //       "employmentType": event.EmploymentType,
    //       "start": event.startdate,
    //       "end": event.enddate,
    //       "teacherType": event.TeacherType,
    //       "subjects": [
    //         "string"
    //       ],
    //       "grades": [
    //         "string"
    //       ]
    //     }
    //   ]
    // }

    if (!this.item.hasOwnProperty('experience')) {
      this.item.experience = [
        event
      ]
    } else {
      this.item.experience.push(
        event
      );
    }

    this.teacherProfileService.putTeacherProfile(this.item, this.teacherId).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        this.getTeacherData(this.teacherId);
        this.toastMsg.success('Success', 'Experience data added successfully');
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

    this.route.params.subscribe(params => {
      console.log("route", params)
      this.teacherId = params['id'];
    });

    this.getTeacherData(this.teacherId);
  }

  getTeacherData(id) {
    this.teacherProfileService.getTeacherProfile(id).subscribe((res) => {
      this.item = res;
      
    })
  }

  onWorkingChange() {
    console.log(this.educationForm.value.working)
    this.working = this.educationForm.value.working;
  }

  modelchange(id) {
    console.log(id)
    this.education[id] = this.educationForm
  }
}
