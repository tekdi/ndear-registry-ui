import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentProfileService } from '../../../services/student/student-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
import { InviteService } from '../../../services/invite/invite.service';

@Component({
  selector: 'app-student-teacher-signup',
  templateUrl: './student-teacher-signup.component.html',
  styleUrls: ['./student-teacher-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {
  form: FormGroup;
  aboveControl = new FormControl("true");
  header1: string = 'plain';
  data;
  constructor(fb: FormBuilder, public router: Router,
    public studentProfileService: StudentProfileService,
    public toastMsg: ToastMessageService,
    public inviteService: InviteService
  ) {
    this.form = fb.group({
      above: this.aboveControl,
      fullName: ['', Validators.required],
      gaurdianfullName: [''],
      mobileEmail: ['', Validators.required],
      accepted: false
    });
  }

  ngOnInit(): void {
    this.setUserCategoryValidators()
  }

  // changeAge(){
  //   alert('hi');
  // }
  onSubmit() {
    let isEmailId = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.value.mobileEmail);
  
    if (isEmailId) {
      this.data = {
        "identityDetails": {
          "fullName": this.form.value.fullName,
          "gaurdianfullName" :  this.form.value.gaurdianfullName,
          "above" :  this.form.value.above
        },
        "contactDetails": {
          'email': this.form.value.mobileEmail,
          'mobile': this.form.value.mobileEmail
        }
      }
    }else {
        this.data = {
          "identityDetails": {
            "fullName": this.form.value.fullName,
            "gaurdianfullName" :  this.form.value.gaurdianfullName,
            "above" :  this.form.value.above
          },
          "contactDetails": {
            'mobile': this.form.value.mobileEmail,
          }
        }
      }

      this.inviteService.inviteStudent(this.data).subscribe((res) => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          this.toastMsg.success('Success', 'Signup Successfully..!');
          this.router.navigate(['/login']);
         // const url = this.router.createUrlTree(['/student-invite'])
          //window.open(url.toString(), '_blank')
        } else {
          this.toastMsg.error('Error', res.params.errmsg);
        }
      }, (err) => {
  
        console.log({ err });
  
      });
      /*this.studentProfileService.postStudentProfile(this.data).subscribe((res) => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          ///this.toastMsg.success('Success', 'Signup Successfully..!');
          localStorage.setItem('studentId', res.result.Student.osid);
          // this.router.navigate(['/student-profile', { 'id': res.result.Institute.osid}]);
        }
      });*/
      localStorage.setItem('user', JSON.stringify(this.form.value));
      localStorage.setItem('education', '[]');
     // this.router.navigate(['verification', { 'for': 'student' }]);
    }

    setUserCategoryValidators() {
//      const relationControl = this.form.get('relation');
      const gaurdianfullNameControl = this.form.get('gaurdianfullName');

      this.form.get('above').valueChanges
        .subscribe(above => {
          console.log(above)
          if (!above) {
           // relationControl.setValidators([Validators.required]);
            gaurdianfullNameControl.setValidators([Validators.required]);
          }else{
          // this.form.({'gaurdianfullName' : ''})
          }
          // if (above){
          //   relationControl.setErrors({ 'incorrect': true});
          //   relationControl.clearValidators();
          //   gaurdianfullNameControl.setErrors({ 'incorrect': true});
          //   gaurdianfullNameControl.clearValidators();
          // }
        });
    }

  }
