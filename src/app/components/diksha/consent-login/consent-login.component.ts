import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consent-login',
  templateUrl: './consent-login.component.html',
  styleUrls: ['./consent-login.component.css']
})
export class ConsentLoginComponent implements OnInit {
  @Output() modalPage = new EventEmitter<any>();
  header1: string = 'main';
  form: FormGroup;
  aboveControl = new FormControl(false);
  consent: any;
  closeResult: string;

  constructor(fb: FormBuilder, public router: Router,
    private modalService: NgbModal) {
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
    let item = {
      'page' : 'page2'
    }
    this.modalPage.emit(item);
    localStorage.setItem('consent-user', JSON.stringify(this.form.value.mobileEmail));
    //this.router.navigate(['verification',{'for':'diksha'}]);
  }

 

}
