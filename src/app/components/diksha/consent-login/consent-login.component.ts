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
  consent: any;

  constructor(fb: FormBuilder, public router: Router) {
    this.consent = JSON.parse(localStorage.getItem('consent'));
    this.form = fb.group({
      mobileEmail: ['', Validators.required],
      granted: false
    });
   }

  ngOnInit(): void {
  }

   onSubmit(){
    console.log(this.form.value);
    this.consent.push(this.form.value)
    localStorage.setItem('consent', JSON.stringify(this.consent));
    this.router.navigate(['verification',{'for':'diksha'}]);
  }

}
