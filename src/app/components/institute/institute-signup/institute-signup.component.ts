import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstituteProfileService } from '../../../services/institute/institute-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';

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
    public toastMsg: ToastMessageService) { 
    if(JSON.parse(localStorage.getItem('institutes-invite')) != null){
      this.user = JSON.parse(localStorage.getItem('institutes-invite'))[0].email;
      // this.form.value.fullName = this.user;
    }else{
      this.user = 'jayant@pragatiinstitute.com'
    }
    this.form = fb.group({
      fullName: ['', Validators.required],
      mobileEmail: [this.user, Validators.required],
      accepted: false
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form.value);

    this.instituteProfileService.postInstituteProfile(this.form.value).subscribe((res) => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        //this.toastMsg.success('Success', 'Institude Profile added successfully');
        this.router.navigate(['/institute-profile', { 'id': res.osid }]);
      }
    });
    
    localStorage.setItem('user', JSON.stringify(this.form.value));
    localStorage.setItem('education','[]');
    localStorage.setItem('experience','[]');
    this.router.navigate(['verification',{'for':'instituteS2'}]);
  }


}
