import { Component, OnInit } from '@angular/core';
import { AttestationService } from '../../../services/attestation/attestation.service';

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
  attestation;
  constructor(
    public attestationService: AttestationService) {
  }

  ngOnInit(): void {
    this.attestation = [
      {
        "id": "29dc4d60-0a5a-45d6-9871-75827941aa46",
        "entity": "Student",
        "entityId": "1-4c006597-a509-40b7-8da7-c14eb5bb212d",
        "property": "educationDetails/1-4c006597-a509-40b7-8da7-c14eb5bb212d",
        "propertyId": "null",
        "createdAt": "2021-06-21T13:22:34.735+00:00",
        "attestedOn": "null",
        "notes": "null",
        "status": "OPEN",
        "conditions": "(ATTESTOR#$.experience.[*].institute#.contains(\"ABC govt school\")) && ATTESTOR#$.experience[?(@.institute == '\"ABC govt school\"')]['_osState']#.contains('PUBLISHED')",
        "attestorEntity": "Teacher",
        "closed": "false",
        'type': 'education'
        // 'EmploymentType': "Contract",
        // 'TeacherType': "Teacher (KGBV)",
        // 'attested': 'false',
        // 'consent': 'false',
        // 'enddate': "2145-03-21",
        // 'institute': "Bhartiya Shiksha Parishad",
        // 'note': "reject",
        // 'send': 'true',
        // 'startdate': "2222-03-12"
      },
      {
        "id": "d8dc7974-a2be-4e09-8c42-d3a3d275763f",
        "entity": "Student",
        "entityId": "1-f3f76ba2-2856-4d3e-ad66-72858f9561ef",
        "property": "educationDetails/1-f3f76ba2-2856-4d3e-ad66-72858f9561ef",
        "propertyId": "null",
        "createdAt": "2021-06-21T13:46:17.631+00:00",
        "attestedOn": "null",
        "notes": "null",
        "status": "OPEN",
        "conditions": "(ATTESTOR#$.experience.[*].institute#.contains(\"ABC govt school\")) && ATTESTOR#$.experience[?(@.institute == \"ABC govt school\")]['_osState']#.contains('PUBLISHED')",
        "attestorEntity": "Teacher",
        "closed": "false"
      }
    ]
    this.user = JSON.parse(localStorage.getItem('user'));
    this.education = JSON.parse(localStorage.getItem('education'));
    console.log(this.attestation);

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

}
