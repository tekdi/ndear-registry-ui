import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InviteService } from '../../../services/invite/invite.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';

@Component({
  selector: 'app-institute-teachers',
  templateUrl: './institute-teachers.component.html',
  styleUrls: ['./institute-teachers.component.css']
})
export class InstituteTeachersComponent implements OnInit {
  currentDate = new Date();
  teachers = [];
  user;
  header1: string = 'institute';
  tab: string = 'teachers';
  tempEmail : string;

  schema = {
    "type": "object",
    "title": "Invite",
    "properties": {
      "emails": {
        "title": "Enter Mobile Number",
        "type": "string",
      }
    }
  }

  form = [
    {
      "key": "emails",
      "type": "textarea",
      "placeholder": "Enter Mobile Number"
    },

    {
      "type": "submit",
      "style": "btn btn-primary text-end mb-3 fw-bold text-capitalize",
      "title": "Send Invite"
    }
  ]
  constructor(public router: Router,
    public inviteService: InviteService,
    public toastMsg: ToastMessageService) {


  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    // if (JSON.parse(localStorage.getItem('teachers')) != null) {
    //   this.teachers = JSON.parse(localStorage.getItem('teachers'));
    // }

  }

  oninviteSubmit(event) {
    // console.log(event);
    // this.user.details = this.editform.value

    let isEmailId = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.emails);
    // if (!isEmailId) {
    //   this.toastMsg.error('Error', "Enter correct Email Id");
    // } else {

      if (event.emails.indexOf(',') > -1) {
        event.emails = event.emails.split(',');
        event.emails.forEach(email => {
          var teacher = {
            'email': email,
            'mobile':  event.email
          }
          this.teachers.push(teacher);
        });
      }
      else {
        var teacher = {
          'email': event.emails,
          'mobile': event.email
        }

        console.log('teacher -->', teacher);
        this.teachers.push(teacher);
      }

      console.log('this.teachers[this.teachers.length - 1] -->', this.teachers[this.teachers.length - 1]);
      let data1 = this.teachers[this.teachers.length - 1];
     // data.mobile = data.email;

     if (!isEmailId) {
       this.tempEmail = '';
     }else{
      this.tempEmail = data1.email;
     }

      let data = {
        "contactDetails": {
        "email":  this.tempEmail,
        "mobile" : data1.email
        },
        "identityDetails": {
          "fullName": ""
        }
      }

      this.inviteService.inviteTeacher(data).subscribe((res) => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          this.toastMsg.success('Success', 'Invited successfully');
        } else {
          this.toastMsg.error('Error', res.params.errmsg);
        }
      }, (err) => {

        console.log({ err });

      });

      console.log(this.teachers);

      localStorage.setItem('teachers', JSON.stringify(this.teachers));
      const url = this.router.createUrlTree(['/teacher-invite'])
      window.open(url.toString(), '_blank')
      // this.educationForm.reset();
    }

  }

