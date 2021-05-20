import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-attestations',
  templateUrl: './board-attestations.component.html',
  styleUrls: ['./board-attestations.component.css']
})
export class BoardAttestationsComponent implements OnInit {
  affiliations;
  experience;
  user;
  header1: string = 'board';
  tab: string = 'attestation';
  constructor() { 
    // this.user = JSON.parse(localStorage.getItem('user'));
    this.affiliations = JSON.parse(localStorage.getItem('affiliations'));
    // this.experience = JSON.parse(localStorage.getItem('experience'));
  }

  ngOnInit(): void {
   
  }
}