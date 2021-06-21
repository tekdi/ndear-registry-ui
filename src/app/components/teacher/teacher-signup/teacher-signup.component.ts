import { Component, OnInit } from '@angular/core';
import { TeacherProfileService } from '../../../services/teacher/teacher-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
import { SchemaService } from 'src/app/services/data/schema.service';
import { InviteService } from '../../../services/invite/invite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-signup',
  templateUrl: './teacher-signup.component.html',
  styleUrls: ['./teacher-signup.component.css']
})
export class TeacherSignupComponent implements OnInit {
  header1: string = 'plain';

  item: any;
  schemaJson: any;
  teacherSchema: any;
  mobileEmail;
  form1: [
    "*",
    {
      "type": "submit",
      "style": "btn btn-primary text-end mt-3 fw-bold text-capitalize",
      "title": "save"
    }
  ]
  constructor(
    public teacherProfileService: TeacherProfileService,
    public toastMsg: ToastMessageService,
    public Schema: SchemaService,
    public router: Router,
    public inviteService: InviteService
  ) {
    this.Schema.getSchemas().subscribe((res) => {
      this.schemaJson = res;
      console.log("res", this.schemaJson.definitions.IdentityDetails);

      this.teacherSchema = {
        "type": "object",
        "title": "Teacher",
        "properties": {
          "fullName": {
            "type": "string",
            "title": "Full Name"
          },
          "mobileEmail": {
            "type": "string",
            "title": "Email Id or Mobile Number"
          },
          "terms": {
            "type": "boolean",
            "default": false,
            "title": "  Accept terms and conditions"
          }
        }
      };
    });
  }

  ngOnInit(): void {

  }

  onEditProfileSubmit(event) {
    console.log(event);
    let isEmailId = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.mobileEmail);
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


if(!event.terms){
  this.toastMsg.error("ERROR", "Please Accept Terms and Conditions");
}else if (!isEmailId && !phoneno.test(event.mobileEmail)) {
      this.toastMsg.error("ERROR", "Enter Correct Email Id or Mobile Number");
    } else {

      if (isEmailId) {
        this.mobileEmail = { 'email': event.mobileEmail, 'mobile': event.mobileEmail }
      } else {
        this.mobileEmail = { 'mobile': event.mobileEmail }

      }

      let data = {
        "identityDetails": {
          "fullName": event.fullName
        },
        "contactDetails": this.mobileEmail

      }

      this.inviteService.inviteTeacher(data).subscribe((res) => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
         // this.toastMsg.success('Success', 'Invited successfully');
         this.toastMsg.success('Success', 'Signup Successfully..!');
         this.router.navigate(['/login']);

        } else {
          this.toastMsg.error('Error', res.params.errmsg);
        }
      }, (err) => {

        console.log({ err });

      });

      /*this.teacherProfileService.postTeacherProfile(data).subscribe((res) => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          ///this.toastMsg.success('Success', 'Signup Successfully..!');
          localStorage.setItem('teacherId', res.result.Teacher.osid);
          // this.router.navigate(['/student-profile', { 'id': res.result.Institute.osid}])
        }
      });*/

      //  localStorage.setItem('user', JSON.stringify(this.form.value));
      //localStorage.setItem('education', '[]');
     // this.router.navigate(['verification', { 'for': 'teacher' }]);


    }
  }

}
