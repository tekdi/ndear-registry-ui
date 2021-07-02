import { Component, OnInit } from '@angular/core';
import { AttestationService } from '../../../services/attestation/attestation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-attestations',
  templateUrl: './institute-attestations.component.html',
  styleUrls: ['./institute-attestations.component.css']
})
export class InstituteAttestationsComponent implements OnInit {
  currentDate = new Date();
  education;
  experience;
  user;
  header1: string = 'institute';
  tab: string = 'attestation';
  attestation: any;
    constructor(
    public attestationService: AttestationService,
    public router: Router) {
  }

  ngOnInit(): void {

    this.getAttastations();
  
    //this.attestationService.getAttestations();

    /*  if( this.education){
        this.education.forEach((element, i) => {
          element.index = i
          element.type = 'education'
          this.attestation.push(element)
    
        });
      }
   
  
      this.experience = JSON.parse(localStorage.getItem('experience'));
      if( this.experience){
      this.experience.forEach((element, i) =>{
        element.index = i
        element.type = 'experience'
        this.attestation.push(element)
      });
    }*/


  }

  getAttastations() {
    this.attestationService.getAttestations('Institute').subscribe((res) => {
      this.attestation = res;
    });
    
  }

  navToAttastationDeatil(entityId, claimId) {
    let data = {
      entityId: entityId,
      claimId: claimId
    }

    console.log(btoa(JSON.stringify(data)));
    this.router.navigate(['/institute-attestation-detail', { 'id': btoa(JSON.stringify(data)) }]);
  }

}
