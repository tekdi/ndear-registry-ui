import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
  providers: [NgbInputDatepickerConfig]
})
export class StudentProfileComponent implements OnInit {
  user;
  editform: FormGroup;
  educationForm: FormGroup;
  model: NgbDateStruct;
  constructor(fb: FormBuilder, config: NgbInputDatepickerConfig, calendar: NgbCalendar) { 
    // customize default values of datepickers used by this component tree
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2020, month: 12, day: 31};

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // setting datepicker popup to open above the input
    // config.placement = ['top-left', 'top-right'];
    localStorage.setItem('is_logedin', "true")
    
    this.user = JSON.parse(localStorage.getItem('user'))
    this.editform = fb.group({
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

    this.educationForm = fb.group({
      degree: ['', Validators.required],
      institute: ['', Validators.required],
      working: [false],
      startdate: [''],
      enddate: [''],
      send: true
    });
  }

  onSubmit(){
    console.log(this.editform.value);
    // this.user.details = this.editform.value
    localStorage.setItem('user', JSON.stringify(this.editform.value));
    // this.router.navigate(['verification']);
  }


  onEducationSubmit(){
    console.log(this.educationForm.value);
    // this.user.details = this.editform.value
    localStorage.setItem('education', JSON.stringify(this.educationForm.value));
    // this.router.navigate(['verification']);
  }

  ngOnInit(): void {
   
    
  }

}
