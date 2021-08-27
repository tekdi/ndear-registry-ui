import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { InstituteProfileService } from '../../services/institute/institute-profile.service';
import { TeacherProfileService } from '../../services/teacher/teacher-profile.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() headerFor: string;
  @Input() tab: string;
  loged_in: boolean = false; institute: any;
  education: any;
  experience: any;
  user: any;
  affiliations: any;
  user_name;
  admin: boolean = false;
  admin_setup: boolean = false;
  attestation_count: number = 0
  consent_count: number = 0;
  entity;
  instituteProfile;
  teacherProfile;
  instituteFlag: boolean = false;
  teacherFlag: boolean = false;

  constructor(
    public router: Router,
    public keycloakService: KeycloakService,
    public instituteProfileService: InstituteProfileService,
    public teacherProfileService: TeacherProfileService
  ) { }

  async ngOnInit() {
    console.log(this.headerFor, this.tab);
    // this.loged_in = JSON.parse(localStorage.getItem('is_logedin'))
    // console.log(Boolean(localStorage.getItem('is_logedin')))
    if (this.keycloakService.isLoggedIn) {
      this.admin = JSON.parse(localStorage.getItem('admin'))
      this.admin_setup = JSON.parse(localStorage.getItem('admin-setup'))

      if (this.keycloakService.isLoggedIn()) {
        this.user_name = await this.keycloakService.getUsername();

      } else {
        if (JSON.parse(localStorage.getItem('user')) != null) {
          this.user = JSON.parse(localStorage.getItem('user'))
          this.user_name = this.user.fullName;
        }
      }

      this.keycloakService.loadUserProfile().then((res) => {
        this.entity = res['attributes'].entity[0];

        if (this.entity != 'Student') {

          this.instituteProfileService.getInstituteProfile('').subscribe((res) => {
            if (res?.params?.status != 'UNSUCCESSFUL') {
              this.instituteProfile = res[0];
              this.instituteFlag = true;;
            }
          }, (err) => {
            this.instituteFlag = false;;
          })


          this.teacherProfileService.getTeacherProfile('').subscribe((res) => {
            if (res?.params?.status != 'UNSUCCESSFUL') {
              this.teacherProfile = res[0];
              this.teacherFlag = true;
            }
          }, (err) => {
            this.teacherFlag = false;
          })
        }

      });

      this.institute = JSON.parse(localStorage.getItem('institute-detail'));
      if (this.headerFor == 'institute') {
        this.education = JSON.parse(localStorage.getItem('education'));
        if (this.education != null && this.education.length > 0) {
          this.education.forEach(element => {
            if (element.attested == "pending") {
              this.attestation_count += 1
            }
          });
          // this.attestation_count = this.attestation_count + this.education.length
        }
        this.experience = JSON.parse(localStorage.getItem('experience'));
        if (this.experience != null && this.experience.length > 0) {
          this.experience.forEach(element => {
            if (element.attested == "pending") {
              this.attestation_count += 1
            }
          });
          // this.attestation_count = this.attestation_count + this.experience.length
        }

        console.log("this.attestation_count", this.attestation_count)
      }
      if (this.headerFor == 'teacher') {
        // if (this.user.consent === true) {
        //   this.consent_count = 1
        // }
        // this.attestation_count = this.attestation_count + this.education.length
      }

      if (this.headerFor == 'teacher') {
        this.affiliations = JSON.parse(localStorage.getItem('affiliations'));
        if (this.affiliations && this.affiliations.attested === "pending") {
          this.consent_count = 1
        }
        // this.attestation_count = this.attestation_count + this.education.length
      }


    }
  }

  redirectTo() {
    // let teacherId = localStorage.getItem('teacherId');
    this.router.navigate(['/teacher-profile']);

  }

  navToInstitute() {
    this.router.navigate(['/institute-profile']);
    this.modalClose();

  }

  navToTeacher() {
    this.router.navigate(['/teacher-profile']);
    this.modalClose();

  }

  modalClose() {
    $('.modal-backdrop').hide(); // for black background
    $('body').removeClass('modal-open'); // For scroll run
    $('#modal').modal('hide');
  }

  logout() {
    localStorage.clear();

    this.keycloakService.clearToken();
    // window.location.reload();
    this.keycloakService.logout('https://ndear.xiv.in');

  }


  logout1() {
    localStorage.clear();

    this.keycloakService.clearToken();
    this.keycloakService.logout('https://ndear.xiv.in');

  }

}
