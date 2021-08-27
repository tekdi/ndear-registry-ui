import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentProfileService } from '../../../services/student/student-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { SchemaService } from 'src/app/services/data/schema.service';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  providers: [NgbInputDatepickerConfig]
})
export class StudentProfileComponent implements OnInit {
  header1: string = 'student';
  tab: string = 'profile';
  user: any;
  education;
  institute
  editUserform: FormGroup;
  educationForm: FormGroup;
  model: NgbDateStruct;
  startdate: NgbDateStruct;
  enddate: NgbDateStruct;
  working: Boolean = true;
  studentId: string;
  studentResult: any;
  fb;
  schemaJson: any;
  studentProfileSchema;
  educationSchema;

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

  constructor(fb: FormBuilder,
    config: NgbInputDatepickerConfig,
    calendar: NgbCalendar,
    public router: Router,
    private route: ActivatedRoute,
    public studentProfileService: StudentProfileService,
    public toastMsg: ToastMessageService,
    public Schema: SchemaService) {
    this.fb = fb;
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2020, month: 12, day: 31 };

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // setting datepicker popup to open above the input
    // config.placement = ['top-left', 'top-right'];
    // localStorage.setItem('is_logedin', "true")
    // localStorage.setItem('admin', 'false')
    //this.user = JSON.parse(localStorage.getItem('user'));


    this.Schema.getSchemas().subscribe((res) => {
      this.schemaJson = res;
      console.log("res", this.schemaJson.definitions.IdentityDetails);

      delete this.schemaJson.definitions.Student.properties.educationDetails;
      this.studentProfileSchema = this.schemaJson.definitions.Student;

      // console.log(this.schema.definitions)
     /* this.studentProfileSchema = {
        "type": "object",
        "title": "Student",
        "definitions": {
          "identityDetails": this.schemaJson.definitions.IdentityDetails,
          "contactDetails": this.schemaJson.definitions.ContactDetails,
          //"address" : this.schemaJson.definitions.Address,
        },
        "properties": {
          "identityDetails": {
            'title': "",
            "$ref": "#/definitions/identityDetails"
          },
          "contactDetails": {
            "$ref": "#/definitions/contactDetails"

          }
          // ,
          // "address": {
          //   'title': "",
          //   "$ref": "#/definitions/address"
          // }
        }
      };*/

      

      this.educationSchema = {
        "type": "object",
        "title": "Comment",
        "properties": {
          "EducationDetails": this.schemaJson.definitions.EducationType
        }
      };

      console.log('  this.teacherSchema = > ', this.educationSchema);

    });

    this.route.params.subscribe(params => {
      console.log("route", params)
      this.studentId = params['id'];
    });

    this.getStudentData(this.studentId);

    this.education = JSON.parse(localStorage.getItem('education'))
    this.educationForm = fb.group({
      institute: ['', Validators.required],
      working: [true],
      startdate: [{ 'day': '', 'month': '', 'year': '' }],
      enddate: [{ 'day': '', 'month': '', 'year': '' }],
      send: true,
      attested: false
    });
  }

  onEditProfileSubmit(event) {
    // console.log(this.editUserform.value);
    // this.user.details = this.editform.value
    //  localStorage.setItem('user', JSON.stringify(this.editUserform.value));
    //  this.user = this.editUserform.value
    // this.router.navigate(['student-profile']);

    // if (this.studentId &&  this.studentId != "null") {
    event.osid = this.user.osid;
    this.studentId = this.user.osid;

    event.identityDetails.osid = this.user.identityDetails.osid;
    event.contactDetails.osid = this.user.contactDetails.osid;
    // event.address.osid = this.user.address.osid;
    const data = event; //this.editUserform.value;

    this.studentProfileService.putStudentProfile(data, this.studentId).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        //   this.router.navigate(['/student-profile', { 'id': this.studentId }]);
        this.getStudentData(this.studentId);
        this.toastMsg.success('Success', 'Student Profile Updated Successfully');
      } else {
        this.toastMsg.error('Error', res.params.errmsg);
      }
    })
    /* } else {
       const data = event;
       this.studentProfileService.postStudentProfile(data).subscribe(res => {
         if (res.responseCode == 'OK' && !res.params.errmsg) {
           // localStorage.setItem('student_id', res.result.Student.osid);
         //  this.router.navigate(['/student-profile', { 'id': res.result.Student.osid }]);
           this.getStudentData(res.result.Student.osid);
           this.toastMsg.success('Success', 'Student Profile Added Successfully');
         } else {
           this.toastMsg.error('Error', res.params.errmsg);
         }
       })
     }*/
  }

  onSubmit() {

  }

  onEducationSubmit(event) {
    console.log(event);
    // this.user.details = this.editform.value
    event.attested = "pending"
    event.note = "Attestation pending"
    // this.education.push(event)
    this.studentId = this.user.osid;
    this.educationForm.reset();

    if (!this.user.hasOwnProperty('educationDetails')) {
      this.user.educationDetails = [
        event.EducationDetails

      ]
    } else {
      this.user.educationDetails.push(
        event.EducationDetails
      );
    }

    this.studentProfileService.addProperty(event.EducationDetails, this.studentId).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        // localStorage.setItem('student_id', res.result.Student.osid);
        //  this.router.navigate(['/student-profile', { 'id': this.studentId }]);

        // this.getStudentData(this.studentId);
        this.studentProfileService.getStudentProfile(this.studentId).subscribe((res) => {
          this.user = res[0];
          let self = this;
          this.toastMsg.success('Success', 'Educational Deatils Added Successfully');

          for (let i = 0; i <= self.user.educationDetails.length; i++) {

            console.log(self.user.educationDetails[i]._osState);
            if (self.user.educationDetails[i]._osState == 'DRAFT') {
              this.sendVerification(this.studentId, self.user.educationDetails[i].osid);
              this.getStudentData(this.studentId);
            }
          }
          // this.toastMsg.success('Success', 'Educational Deatils Added Successfully');

          console.log({ res });
          this.studentResult = res[0];
          console.log("this.user", this.user);
        })

      } else {
        this.toastMsg.error('Error', res.params.errmsg);
      }
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('institute-detail')) {
      // this.institute = JSON.parse(localStorage.getItem('institute-detail')).BasicDetails.instituteName;
      //this.schema.properties.institute.enum.push(this.institute)
    }

    this.route.params.subscribe(params => {
      console.log("route", params)
      this.studentId = params['id'];
    });
    this.getStudentData(this.studentId);
  }


  getStudentData(studentId) {

    this.studentProfileService.getStudentProfile(studentId).subscribe((res) => {
      this.user = res[0];

      console.log({ res });
      this.studentResult = res[0];
      console.log("this.user", this.user);
    })
  }

  sendVerification(entityId, propertyId) {
    this.studentProfileService.sendAttestedStudentProperty(entityId, propertyId).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        // localStorage.setItem('student_id', res.result.Student.osid);
        //  this.router.navigate(['/student-profile', { 'id': this.studentId }]);

        this.getStudentData(this.studentId);
      } else {
        this.toastMsg.error('Error', res.params.errmsg);
      }
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
