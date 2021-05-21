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
  experianceSchema = {
    "type": "object",
    "title": "Experience",
    "properties": {
      "institute": {
        "title": "Institute Name",
        "type": "string",
        "enum": []
      },
      "EmploymentType": {
        "title": "Employment Type",
        "type": "string",
        "enum": ['Permanant','Contract']
      },
      "startdate": {
        "title": "Start date",
        "type": "string",
        "format": "date"
      },
      "enddate": {
        "title": "End date",
        "type": "string",
        "format": "date"
      },
      "TeacherType": {
        "title": "Teacher Type",
        "type": "string",
        "enum": ['Assistant teacher PS',
                'Assistant teacher UPS Head teacher primary school',
                'Shiksha Mitra',
                'Anudeshak (UPS)',
                'Assistant teacher (AidedPS)',
                'Assistant teacher (Aided UPS)',
                'Teacher (KGBV)',
                'Itinerant Teacher (CWSN)',
                'Govt. LT (TGT) ',
                'Govt. Lecturer (PGT)',
                'Aided School LT (TGT)',
                'Aided School Lecturer (PGT)',
                'ICT teacher',
                'Vocational teachers',
                'Attached Primary Teacher',
                'Sanskrit aided school'
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
      "EmploymentType",
      "startdate",
      "TeacherType"
    ]
  };
  educationSchema = {
    "type": "object",
    "title": "Experience",
    "properties": {
      "institute": {
        "title": "Institute Name",
        "type": "string",
        "enum": []
      },
      "Qualification": {
        "title": "Qualification",
        "type": "string",
        "enum": ['Below secondary','Secondary','Higher secondary','Graduate','Post graduate', 'M.Phil','Ph.D','PostDoctoral']
      },
      "year": {
        "title": "Year of Graduation",
        "type": "string"
      },
      "marks": {
        "title": "Marks / Ranking / GPA, etc",
        "type": "string"
      },
      "send": {
        "title": " Send for verification?",
        "type": "boolean",
        "default": true
      }
    },
    "required": [
      "institute",
      "Qualification",
      "year",
      "marks"
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
      address: ['']
    });
    
    this.education = JSON.parse(localStorage.getItem('education'))
    this.experience = JSON.parse(localStorage.getItem('experience'))
    this.educationForm = fb.group({
      institute: ['', Validators.required],
      working: [true],
      startdate: [{'day':'','month':'', 'year': ''}],
      enddate: [{'day':'','month':'', 'year': ''}],
      send: true,
      attested: false,
      consent: false
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
    event.consent= false
    this.education.push(event)
    console.log(this.education)
    localStorage.setItem('education', JSON.stringify(this.education));
    this.educationForm.reset();
    // this.education = this.educationForm.value
  }

  onExperienceSubmit(event){
    console.log(event);
    // this.user.details = this.editform.value
    event.attested = "pending"
    event.consent= false
    this.experience.push(event)
    console.log(this.experience)
    localStorage.setItem('experience', JSON.stringify(this.experience));
    this.educationForm.reset();
    // this.education = this.educationForm.value
  }

  ngOnInit(): void {
    if(localStorage.getItem('institute-detail')){
      this.institute = JSON.parse(localStorage.getItem('institute-detail')).BasicDetails.instituteName;
      this.experianceSchema.properties.institute.enum.push(this.institute)
      this.educationSchema.properties.institute.enum.push(this.institute)
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
