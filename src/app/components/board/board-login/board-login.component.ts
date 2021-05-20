import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-login',
  templateUrl: './board-login.component.html',
  styleUrls: ['./board-login.component.css']
})
export class BoardLoginComponent implements OnInit {
  form: FormGroup;
  aboveControl = new FormControl(false);
  header1: string = 'plain';
  constructor(fb: FormBuilder, public router: Router) { 
    this.form = fb.group({
      boardName: ['CBSE Board'],
      mobileEmail: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('board', JSON.stringify(this.form.value));
    this.router.navigate(['verification',{'for':'board'}]);
  }

  
}

