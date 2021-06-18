import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstituteProfileService } from '../../../services/institute/institute-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
import { InviteService } from '../../../services/invite/invite.service';

@Component({
  selector: 'app-institute-signup',
  templateUrl: './institute-signup.component.html',
  styleUrls: ['./institute-signup.component.css']
})
export class InstituteSignupComponent implements OnInit {
  form: FormGroup;
  header1: string = 'plain';
  user: any;

  constructor(fb: FormBuilder, public router: Router,
    public instituteProfileService: InstituteProfileService,
    public inviteService: InviteService,
    public toastMsg: ToastMessageService) {
    if (JSON.parse(localStorage.getItem('institutes-invite')) != null) {
      this.user = JSON.parse(localStorage.getItem('institutes-invite'))[0].email;

      this.form = fb.group({
        fullName: ['', Validators.required],
        mobileEmail: [this.user, Validators.required],
        accepted: false
      });
      // this.form.value.fullName = this.user;
    } else {
      this.user = ''
      this.form = fb.group({
        fullName: ['', Validators.required],
        mobileEmail: ['', Validators.required],
        accepted: false
      });
    }

  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
    let isEmailId = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.value.mobileEmail);

    if (!isEmailId) {
      this.toastMsg.error('Error', "Enter correct Email Id")
    } else {
      const data = {
        "instituteName": this.form.value.fullName,
        "email": this.form.value.mobileEmail,

      }

      this.inviteService.inviteInstitute(data).subscribe((res) => {
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


     /* this.instituteProfileService.postInstituteProfile(data).subscribe((res) => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          //this.toastMsg.success('Success', 'Institude Profile added successfully');
          localStorage.setItem('institute-entity', res.result.Institute.osid)
        //  this.router.navigate(['/institute-profile', { 'id': res.result.Institute.osid }]);
        }
      });*/

      localStorage.setItem('user', JSON.stringify(this.form.value));
      localStorage.setItem('education', '[]');
      localStorage.setItem('experience', '[]');
      //this.router.navigate(['verification', { 'for': 'instituteS2' }]);
    }
  }

  validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re.test(input_str);
  }


}
