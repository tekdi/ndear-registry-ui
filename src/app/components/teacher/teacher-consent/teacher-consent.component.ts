import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-consent',
  templateUrl: './teacher-consent.component.html',
  styleUrls: ['./teacher-consent.component.css']
})
export class TeacherConsentComponent implements OnInit {
  currentDate = new Date();
  user: any;
  header1: string = 'teacher';
  tab: string = 'consent';
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onConsentApprove(action){
    this.user.consent = action;
    localStorage.setItem('user', JSON.stringify(this.user));
    
  }

}
