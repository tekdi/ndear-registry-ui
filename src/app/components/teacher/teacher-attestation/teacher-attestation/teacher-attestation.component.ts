import { Component, OnInit } from '@angular/core';
import { AttestationService } from '../../../../services/attestation/attestation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-attestation',
  templateUrl: './teacher-attestation.component.html',
  styleUrls: ['./teacher-attestation.component.css']
})
export class TeacherAttestationComponent implements OnInit {

  currentDate = new Date();
  education;
  experience;
  user;
  header1: string = 'teacher';
  tab: string = 'attestation';
  attestation;
  constructor(
    public attestationService: AttestationService,
    public router: Router) {
  }

  ngOnInit(): void {

this.getAttastations();
  }


  getAttastations() {
    this.attestationService.getAttestations('Teacher').subscribe((res) => {
      this.attestation = res;
    });
  }

  navToAttastationDeatil(entityId){
    this.router.navigate(['/teacher-profile', , { 'entityId': entityId }]);

  }

}
