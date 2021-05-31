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


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  providers: [NgbInputDatepickerConfig]
})
export class StudentProfileComponent implements OnInit {
  header1: string = 'student';
  tab: string = 'profile';
  user;
  education;
  institute
  editUserform: FormGroup;
  educationForm: FormGroup;
  model: NgbDateStruct;
  startdate: NgbDateStruct;
  enddate: NgbDateStruct;
  working: Boolean = true;
  studentId;
  fb;
  schema = {
    "type": "object",
    "title": "Comment",
    "properties": {
      "institute": {
        "title": "Institute Name",
        "type": "string",
        "enum": ['Bhartiya Shiksha Parishad', 'Sarvoday School', 'Aadharshila Institute']
      },
      "board": {
        "title": "Board of Education",
        "type": "string",
        "enum": ['CBSE', "State Board"]
      },
      "medium": {
        "title": "Medium of Education",
        "type": "string",
        "enum": ['English', 'Hindi', 'Marathi', 'Gujarati']
      },
      "class": {
        "title": "Enrollment Class/Std.",
        "type": "string",
        "enum": [
          "Grade 1",
          "Grade 2",
          "Grade 3",
          "Grade 4",
          "Grade 5",
          "Grade 6",
          "Grade 7",
          "Grade 8",
          "Grade 9",
          "Grade 10",
          "Grade 11",
          "Grade 12"
        ]
      },
      "send": {
        "title": " Send for verification?",
        "type": "boolean",
        "default": true
      }
    },
    "required": [
      "institute",
      "board",
      "medium",
      "class"
    ]
  };
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
    public toastMsg: ToastMessageService) {
      this.fb = fb;
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2020, month: 12, day: 31 };

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // setting datepicker popup to open above the input
    // config.placement = ['top-left', 'top-right'];
    localStorage.setItem('is_logedin', "true")
    // localStorage.setItem('admin', 'false')
    //this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe(params => {
      console.log("route", params)
      this.studentId = params['id'];
    });

    this.editUserform = this.fb.group({
      identityDetails : this.fb.group({ 
        fullName: [''],
        gender:  [''],
        dob: [''],
        idType:['']
      }),
      contactDetails:fb.group({
        mobileEmail:[],       
        address: [''],
        mobile: [''],
      }),
      gaurdianfullName: [''],
      relation:[''],
      accepted: true,
      aadhaarNo:[''],
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

  onEditProfileSubmit() {
    console.log(this.editUserform.value);
    // this.user.details = this.editform.value
  //  localStorage.setItem('user', JSON.stringify(this.editUserform.value));
  //  this.user = this.editUserform.value
    // this.router.navigate(['student-profile']);


    const data1 = {

      "identityDetails": {
        "fullName": this.editUserform.value.fullName,
        "gender": this.editUserform.value.gender,
        "dob": this.editUserform.value.dob,
        "identityType": this.editUserform.value.idType,
        "identityValue": "string"
      },
      "contactDetails": {
        "email": this.editUserform.value.mobileEmail,
        "mobile": this.editUserform.value.mobile,
        "address": this.editUserform.value.address
      }
    }

    const data = this.editUserform.value;

    this.studentProfileService.postStudentProfile(data).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
       // localStorage.setItem('student_id', res.result.Student.osid);
        this.router.navigate(['/student-profile', { 'id': res.result.Student.osid }]);
        this.getStudentData(res.result.Student.osid);
        this.toastMsg.success('Success', 'Student Profile added successfully');
      }
    })
  }

  onSubmit() {

  }
  // onEducationChange(event){
  //   console.log(event)
  //   if(!event.working){
  //     this.schema.properties.enddate.type = 'string'
  //   }
  //   else{
  //     this.schema.properties.enddate.type = 'hidden'
  //   }
  // }
  onEducationSubmit(event) {
    console.log(event);
    // this.user.details = this.editform.value
    event.attested = "pending"
    event.note = "Attestation pending"
    this.education.push(event)
    console.log(this.education)
    localStorage.setItem('education', JSON.stringify(this.education));
    this.educationForm.reset();
    // this.education = this.educationForm.value
  }

  ngOnInit(): void {
    if (localStorage.getItem('institute-detail')) {
      this.institute = JSON.parse(localStorage.getItem('institute-detail')).BasicDetails.instituteName;
      this.schema.properties.institute.enum.push(this.institute)
    }

    this.route.params.subscribe(params => {
      console.log("route", params)
      this.studentId = params['id'];
    });
    this.getStudentData(this.studentId);
  }


  getStudentData(studentId) {
   

    this.studentProfileService.getStudentProfile(studentId).subscribe((res) => {
      //this.item = res;
      this.user = res;
    //   this.fb.group({
    //     identityDetails : this.fb.group(res['identityDetails']),
    //     contactDetails:this.fb.group(res['contactDetails']),
    //     gaurdianfullName: '',
    //     relation: '',
    //     accepted: true,
    //     aadhaarNo: '',
    //   });
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
