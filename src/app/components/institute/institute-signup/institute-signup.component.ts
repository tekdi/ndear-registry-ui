import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-signup',
  templateUrl: './institute-signup.component.html',
  styleUrls: ['./institute-signup.component.css']
})
export class InstituteSignupComponent implements OnInit {
  form: FormGroup;
  header1: string = 'plain';
  user: any;
  constructor(fb: FormBuilder, public router: Router) { 
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
    localStorage.setItem('user', JSON.stringify(this.form.value));
    localStorage.setItem('education','[]');
    localStorage.setItem('experience','[]');
    this.router.navigate(['verification',{'for':'instituteS2'}]);
  }


}
