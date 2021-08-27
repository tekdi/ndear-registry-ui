import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AttestationService } from '../../../../services/attestation/attestation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-attestation',
  templateUrl: './teacher-attestation.component.html',
  styleUrls: ['./teacher-attestation.component.css']
})
export class TeacherAttestationComponent implements OnInit {
  @Output() navToAttastation = new EventEmitter<any>();

  currentDate = new Date();
  education: any;
  experience: any;
  user: any;
  header1: string = 'teacher';
  tab: string = 'attestation';
  attestation: any;
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

  navToAttastationDeatil(entityId, claimId) {
    let data = {
      entityId: entityId,
      claimId: claimId
    }

    console.log(btoa(JSON.stringify(data)));
    this.router.navigate(['/teacher-attestation-detail', { 'id': btoa(JSON.stringify(data)) }]);
  }

}
