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
  user: any;
  education;
  institute
  editUserform: FormGroup;
  educationForm: FormGroup;
  model: NgbDateStruct;
  startdate: NgbDateStruct;
  enddate: NgbDateStruct;
  working: Boolean = true;
  studentId;
  studentResult: any;
  fb;

  studentProfile = {
    "type": "object",
    "title": "Teacher",
    "definitions": {
      "identityDetails": {
        "type": "object",
        "required": [
          "fullName"
        ],
        "properties": {
          "fullName": {
            "type": "string"
          },
          "gender": {
            "type": "string",
            "enum": [
              "Male",
              "Female",
              "Other"
            ]
          } ,
        "dob": {
          "type": "string",
          "format": "date",
          "widget": {
            "id": "date"
          },
        },
        "identityType": {
          "type": "string",
          "enum": [
            "Voter",
            "Aadhaar"
            ]
        },
        "identityValue": {
          "type": "string"
        }
      },      
      },
      "contactDetails": {
        "type": "object",
        "required": [
        ],
        "properties": {
          "email": {
            "type": "string"
          },
          "mobile": {
            "type": "string"
          },
          "address": {
            "type": "string"
          }
        }
      },
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
  
  form1: [
    "*",
    {
      "type": "submit",
      "style": "btn btn-primary text-end mt-3 fw-bold text-capitalize",
      "title": "save"
    }
  ]

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

  item2: any = [
    { name: 'gh' },
    { name: 'gfhg' }
  ];

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

    const data = event; //this.editUserform.value;

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
    // this.education.push(event)
    // console.log(this.education)
    // localStorage.setItem('education', JSON.stringify(this.education));
    this.educationForm.reset();
    // this.education = this.educationForm.value
    /* const data = {
 
       "educationDetails": [
         {
           "institute": event.institute,
           "medium": event.medium,
           "class": event.class
         }
       ]
     }*/
     

    if (!this.user.hasOwnProperty('educationDetails')) {
      this.user.educationDetails = [{
        "institute": event.institute,
        "medium": event.medium,
        "class": event.class
      }
      ]
    } else {
      this.user.educationDetails.push({
        "institute": event.institute,
        "medium": event.medium,
        "class": event.class
      });
    }
    this.studentProfileService.putStudentProfile(this.user, this.studentId).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        // localStorage.setItem('student_id', res.result.Student.osid);
        this.router.navigate(['/student-profile', { 'id': this.studentId}]);

        this.getStudentData(this.studentId);
        this.toastMsg.success('Success', 'Educational Deatils Added Successfully');
      }
    })
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

      console.log({ res });
      //this.item = res;
      this.studentResult = res;
      this.user = res;
      console.log("this.user", this.user);
    
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
