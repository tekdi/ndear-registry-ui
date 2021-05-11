import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-teacher-signup',
  templateUrl: './student-teacher-signup.component.html',
  styleUrls: ['./student-teacher-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {
  form: FormGroup;
  aboveControl = new FormControl("true");
  constructor(fb: FormBuilder, public router: Router) { 
    this.form = fb.group({
      above: this.aboveControl,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gaurdianFirstName: [''],
      gaurdianLastName: [''],
      relation: [''],
      mobileEmail: ['', Validators.required],
      accepted: false
    });
  }

  ngOnInit(): void {
    this.setUserCategoryValidators()
  }

  onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('user', JSON.stringify(this.form.value));
    localStorage.setItem('education','[]');
    this.router.navigate(['verification',{'for':'student'}]);
  }

  setUserCategoryValidators() {
    const relationControl = this.form.get('relation');
    const gaurdianFirstNameControl = this.form.get('gaurdianFirstName');
    const gaurdianLastNameControl = this.form.get('gaurdianLastName');

    this.form.get('above').valueChanges
      .subscribe(above => {
        console.log(above)
        if (!above) {
          relationControl.setValidators([Validators.required]);
          gaurdianFirstNameControl.setValidators([Validators.required]);
          gaurdianLastNameControl.setValidators([Validators.required]);
        }
        // if (above){
        //   relationControl.setErrors({ 'incorrect': true});
        //   relationControl.clearValidators();
        //   gaurdianFirstNameControl.setErrors({ 'incorrect': true});
        //   gaurdianFirstNameControl.clearValidators();
        //   gaurdianLastNameControl.setErrors({ 'incorrect': true});
        //   gaurdianLastNameControl.clearValidators();
        // }
      });
  }

}
