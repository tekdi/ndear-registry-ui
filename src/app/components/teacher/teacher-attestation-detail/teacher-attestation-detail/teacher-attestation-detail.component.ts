import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentProfileService } from '../../../../services/student/student-profile.service';

@Component({
  selector: 'app-teacher-attestation-detail',
  templateUrl: './teacher-attestation-detail.component.html',
  styleUrls: ['./teacher-attestation-detail.component.css']
})
export class TeacherAttestationDetailComponent implements OnInit {
  entityId;
  user;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public studentProfileService: StudentProfileService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("route", params)
     this.entityId = params['entityId'];
    });
  }

  getStudentData(studentId) {
    this.studentProfileService.getStudentProfile(studentId).subscribe((res) => {
      this.user = res[0];
    })
  }

}
