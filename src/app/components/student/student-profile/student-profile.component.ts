import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
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
  schema = {
    "type": "object",
    "title": "Comment",
    "properties": {
      "institute": {
        "title": "Institute",
        "type": "string",
        "enum": []
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
  constructor(fb: FormBuilder, config: NgbInputDatepickerConfig, calendar: NgbCalendar, public router: Router) { 
    // customize default values of datepickers used by this component tree
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2020, month: 12, day: 31};

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // setting datepicker popup to open above the input
    // config.placement = ['top-left', 'top-right'];
    localStorage.setItem('is_logedin', "true")
    // localStorage.setItem('admin', 'false')
    this.user = JSON.parse(localStorage.getItem('user'))
    this.editUserform = fb.group({
      fullName: this.user.fullName,
      gaurdianfullName: this.user.gaurdianfullName,
      relation: this.user.relation,
      mobileEmail: this.user.mobileEmail,
      accepted: true,
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: [''],
      mobile: this.user.mobile,
      aadhaarNo: this.user.aadhaarNo,
      idType:  this.user.idType
    });
    
    this.education = JSON.parse(localStorage.getItem('education'))
    this.educationForm = fb.group({
      institute: ['', Validators.required],
      working: [true],
      startdate: [{'day':'','month':'', 'year': ''}],
      enddate: [{'day':'','month':'', 'year': ''}],
      send: true,
      attested: false
    });
  }

  onEditProfileSubmit(){
    console.log(this.editUserform.value);
    // this.user.details = this.editform.value
    localStorage.setItem('user', JSON.stringify(this.editUserform.value));
    this.user = this.editUserform.value
    // this.router.navigate(['student-profile']);
  }

  onSubmit(){
    
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
  onEducationSubmit(event){
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
    if(localStorage.getItem('institute-detail')){
      this.institute = JSON.parse(localStorage.getItem('institute-detail')).BasicDetails.instituteName;
      this.schema.properties.institute.enum.push(this.institute)
    }
  }

  onWorkingChange(){
    console.log(this.educationForm.value.working)
    this.working = this.educationForm.value.working;
  }

  modelchange(id){
    console.log(id)
    this.education[id] = this.educationForm
  }

  

}
