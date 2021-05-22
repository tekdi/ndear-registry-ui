import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-consent',
  templateUrl: './institute-consent.component.html',
  styleUrls: ['./institute-consent.component.css']
})
export class InstituteConsentComponent implements OnInit {
  currentDate = new Date();
  consent: any;
  header1: string = 'institute';
  tab: string = 'consent';
  constructor() { }

  ngOnInit(): void {
    this.consent = JSON.parse(localStorage.getItem('consent'));
  }
  onConsentApprove(action, id){
    this.consent[id].granted = action;
    localStorage.setItem('consent', JSON.stringify(this.consent))
  
  }

}
