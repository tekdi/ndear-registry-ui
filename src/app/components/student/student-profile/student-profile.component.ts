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
  user;
  education;
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
      "degree": {
        "title": "degree",
        "type": "string"
      },
      "institute": {
        "title": "institute",
        "type": "string",
      },
      "working": {
        "title": " I currently studying here",
        "type": "boolean",
        "default": true
      },
      "startdate": {
        "title": "Start date",
        "type": "string",
        "format": "date"
      },
      "enddate": {
        "title": "End date",
        "type": "string",
        "format": "date",
      },
      "send": {
        "title": " Send for verification?",
        "type": "boolean",
        "default": true
      }
    },
    "required": [
      "degree",
      "working",
      "startdate"
    ],
    "if": {
      "properties": { "working": false }
    },
    "then": {
      "properties": { "enddate": { "type": "string" } }
    },
    "else": {
      "properties": { "enddate": { "type": "string" } }
    }
  };
  form: [
    "*",
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
    
    this.user = JSON.parse(localStorage.getItem('user'))
    this.editUserform = fb.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      gaurdianFirstName: this.user.gaurdianFirstName,
      gaurdianLastName: this.user.gaurdianLastName,
      relation: this.user.relation,
      mobileEmail: this.user.mobileEmail,
      accepted: true,
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['']
    });
    
    this.education = JSON.parse(localStorage.getItem('education'))
    this.educationForm = fb.group({
      degree: ['', Validators.required],
      institute: ['', Validators.required],
      working: [true],
      startdate: [{'day':'','month':'', 'year': ''}],
      enddate: [{'day':'','month':'', 'year': ''}],
      send: true
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

  onEducationSubmit(event){
    console.log(event);
    // this.user.details = this.editform.value
    this.education.push(event)
    console.log(this.education)
    localStorage.setItem('education', JSON.stringify(this.education));
    this.educationForm.reset();
    // this.education = this.educationForm.value
  }

  ngOnInit(): void {
   
    
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
