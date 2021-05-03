import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-teacher-login',
  templateUrl: './student-teacher-login.component.html',
  styleUrls: ['./student-teacher-login.component.css']
})
export class StudentTeacherLoginComponent implements OnInit {
  form: FormGroup;
  aboveControl = new FormControl(false);
  constructor(fb: FormBuilder, public router: Router) { 
    this.form = fb.group({
      above: this.aboveControl,
      firstName: ['Paras'],
      lastName: ['Patel'],
      gaurdianFirstName: [''],
      gaurdianLastName: [''],
      relation: [''],
      mobileEmail: ['', Validators.required],
      accepted: true
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('user', JSON.stringify(this.form.value));
    this.router.navigate(['verification']);
  }

  
}
