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
  constructor(fb: FormBuilder, public router: Router) { 
    this.form = fb.group({
      fullName: ['', Validators.required],
      mobileEmail: ['', Validators.required],
      accepted: false
    });
  }

  ngOnInit(): void {
  
  }

  onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('user', JSON.stringify(this.form.value));
    // localStorage.setItem('education','[]');
    localStorage.setItem('experience','[]');
    this.router.navigate(['verification',{'for':'instituteS2'}]);
  }


}
