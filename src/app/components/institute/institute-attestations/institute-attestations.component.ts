import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-attestations',
  templateUrl: './institute-attestations.component.html',
  styleUrls: ['./institute-attestations.component.css']
})
export class InstituteAttestationsComponent implements OnInit {
  education;
  user;
  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user'));
    this.education = JSON.parse(localStorage.getItem('education'));
  }

  ngOnInit(): void {
   
  }

}
