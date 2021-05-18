import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-teachers',
  templateUrl: './institute-teachers.component.html',
  styleUrls: ['./institute-teachers.component.css']
})
export class InstituteTeachersComponent implements OnInit {
  teachers = [];
  user;
  header1: string = 'institute';
  tab: string = 'teachers';

  schema = {
    "type": "object",
    "title": "Invite",
    "properties": {
      "emails": {
        "title": "Enter email Id",
        "type": "string",
      },
      "mobiles": {
        "title": "Enter mobile number",
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
      "key": "mobiles",
      "type": "textarea",
      "placeholder": "Enter Mobile Numbers seperated by comma"
    },
    {
      "type": "submit",
      "style": "btn btn-primary text-end mb-3 fw-bold text-capitalize",
      "title": "Send Invite"
    }
  ]
  constructor(public router: Router) { 
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.teachers = JSON.parse(localStorage.getItem('teachers'));
  }

  ngOnInit(): void {
   
  }

  oninviteSubmit(event){
    // console.log(event);
    // this.user.details = this.editform.value
    event.emails = event.emails.split(',');
    event.mobiles = event.mobiles.split(',');
    event.emails.forEach(email => {
      var teacher = {
        'email': email,
        'mobile': '-'
      }
      this.teachers.push(teacher)
    });
    event.mobiles.forEach(mobile => {
      var teacher = {
        'email': '-',
        'mobile': mobile
      }
      this.teachers.push(teacher)
    });
    // this.teachers = event;
    // this.teachers.mobiles.concat(event.emails);
    console.log(this.teachers)
    localStorage.setItem('teachers', JSON.stringify(this.teachers));
    const url = this.router.createUrlTree(['/teacher-invite'])
    window.open(url.toString(), '_blank')
        // this.educationForm.reset();
      }

}
