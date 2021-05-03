import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  user;
  form: FormGroup;
  constructor(fb: FormBuilder) { 
    // this.form = fb.group({
    //   firstName: this.user.firstName,
    //   lastName: this.user.lastName,
    //   gaurdianFirstName: this.user.gaurdianFirstName,
    //   gaurdianLastName: this.user.gaurdianLastName,
    //   relation: this.user.relation,
    //   mobileEmail: this.user.mobileEmail,
    //   accepted: true,
    //   gender: ['', Validators.required],
    //   dob: ['', Validators.required],
    //   address: ['', Validators.required]
    // });
  }

  onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('user', JSON.stringify(this.form.value));
    // this.router.navigate(['verification']);
  }

  ngOnInit(): void {
    localStorage.setItem('is_logedin', "true")
    this.user = JSON.parse(localStorage.getItem('user'))
  }

}
