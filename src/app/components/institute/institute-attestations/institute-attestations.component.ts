import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-attestations',
  templateUrl: './institute-attestations.component.html',
  styleUrls: ['./institute-attestations.component.css']
})
export class InstituteAttestationsComponent implements OnInit {
  education;
  experience;
  user;
  header1: string = 'institute';
  tab: string = 'attestation';
  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user'));
    this.education = JSON.parse(localStorage.getItem('education'));
    this.experience = JSON.parse(localStorage.getItem('experience'));
  }

  ngOnInit(): void {
   
  }

}
