import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instiitute-students',
  templateUrl: './instiitute-students.component.html',
  styleUrls: ['./instiitute-students.component.css']
})
export class InstiituteStudentsComponent implements OnInit {
  students = [];
  user;
  header1: string = 'institute';
  tab: string = 'students';

  schema = {
    "type": "object",
    "title": "Invite",
    "properties": {
      "emails": {
        "title": "Enter email Id",
        "type": "string",
      }
    }
  }

  form = [
    {
      "key": "emails",
      "type": "textarea",
      "placeholder": "Enter Email Ids seperated by comma"
    },
    {
      "type": "submit",
      "style": "btn btn-primary text-end mb-3 fw-bold text-capitalize",
      "title": "Send Invite"
    }
  ]
  constructor(public router: Router) { 
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.students = JSON.parse(localStorage.getItem('students'));
  }

  ngOnInit(): void {
   
  }

  oninviteSubmit(event){
    // console.log(event);
    // this.user.details = this.editform.value

    if (event.emails.indexOf(',') > -1) { 
      event.emails = event.emails.split(',');
      event.emails.forEach(email => {
        var teacher = {
          'email': email,
          'mobile': '-'
        }
        this.students.push(teacher)
      });
     }
     else{
      var teacher = {
        'email': event.emails,
        'mobile': '-'
      }
      this.students.push(teacher)
     }

    // event.emails = event.emails.split(',');
    // event.mobiles = event.mobiles.split(',');
    // event.emails.forEach(email => {
    //   var student = {
    //     'email': email,
    //     'mobile': '-'
    //   }
    //   this.students.push(student)
    // });
    // event.mobiles.forEach(mobile => {
    //   var student = {
    //     'email': '-',
    //     'mobile': mobile
    //   }
    //   this.students.push(student)
    // });
    // this.students = event;
    // this.students.mobiles.concat(event.emails);
    console.log(this.students)
    localStorage.setItem('students', JSON.stringify(this.students));
    const url = this.router.createUrlTree(['/student-invite'])
    window.open(url.toString(), '_blank')
        // this.educationForm.reset();
      }

}
