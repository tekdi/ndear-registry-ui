import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InviteService} from '../../../services/invite/invite.service';
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
  constructor(public router: Router,
    public inviteService: InviteService,
    public toastMsg: ToastMessageService) { 
    
    
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(JSON.parse(localStorage.getItem('teachers')) != null){
      this.teachers = JSON.parse(localStorage.getItem('teachers'));
    }
    
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
        this.teachers.push(teacher)
      });
     }
     else{
      var teacher = {
        'email': event.emails,
        'mobile': '-'
      }
      this.teachers.push(teacher)
     }

     this.inviteService.inviteTeacher(this.teachers).subscribe((res)=>{
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        this.toastMsg.success('Success', 'Invited successfully');
      }else{
        this.toastMsg.error('Error', res.params.errmsg);
      }
     }, (err)=>{

      console.log({err});

     });
    // event.emails = event.emails.split(',');
    // event.mobiles = event.mobiles.split(',');
    // event.emails.forEach(email => {
    //   var teacher = {
    //     'email': email,
    //     'mobile': '-'
    //   }
    //   this.teachers.push(teacher)
    // });
    // event.mobiles.forEach(mobile => {
    //   var teacher = {
    //     'email': '-',
    //     'mobile': mobile
    //   }
    //   this.teachers.push(teacher)
    // });
    // this.teachers = event;
    // this.teachers.mobiles.concat(event.emails);
    console.log(this.teachers)
    localStorage.setItem('teachers', JSON.stringify(this.teachers));
    const url = this.router.createUrlTree(['/teacher-invite'])
    window.open(url.toString(), '_blank')
        // this.educationForm.reset();
      }

}
