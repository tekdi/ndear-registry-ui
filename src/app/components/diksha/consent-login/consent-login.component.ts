import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consent-login',
  templateUrl: './consent-login.component.html',
  styleUrls: ['./consent-login.component.css']
})
export class ConsentLoginComponent implements OnInit {
  header1: string = 'main';
  form: FormGroup;
  aboveControl = new FormControl(false);

  constructor(fb: FormBuilder, public router: Router) {
    this.form = fb.group({
      mobileEmail: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

   onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('user', JSON.stringify(this.form.value));
    this.router.navigate(['verification',{'for':'consent-login'}]);
  }

}
