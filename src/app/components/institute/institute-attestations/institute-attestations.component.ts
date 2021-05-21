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
  attestation;
  constructor() { 
  }

  ngOnInit(): void {
    this.attestation = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.education = JSON.parse(localStorage.getItem('education'));
    console.log(this.attestation)
    this.education.forEach((element, i) => {
      element.index = i
      element.type = 'education'
      this.attestation.push(element)

    });
    this.experience = JSON.parse(localStorage.getItem('experience'));
    this.experience.forEach((element, i) =>{
      element.index = i
      element.type = 'experience'
      this.attestation.push(element)
    });
  }

}
