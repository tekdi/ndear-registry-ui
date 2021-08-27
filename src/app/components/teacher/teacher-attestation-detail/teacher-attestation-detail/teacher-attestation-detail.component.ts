import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { table } from 'console';
import { GeneralService } from 'src/app/services/general/general.service';
import { AttestationService } from '../../../../services/attestation/attestation.service';
import { TeacherProfileService } from '../../../../services/teacher/teacher-profile.service';

@Component({
  selector: 'app-teacher-attestation-detail',
  templateUrl: './teacher-attestation-detail.component.html',
  styleUrls: ['./teacher-attestation-detail.component.css']
})
export class TeacherAttestationDetailComponent implements OnInit {
  entityId: string;
  user: any;
  education: any;
  educationDetail: any;
  experience: any;
  experienceDetail: any;
  id: string;
  type: string;
  contact: string;
  consent: any = false;
  noteAdded: boolean = false;
  claimId: string;
  entityIdt: string;

  approveNoteSchema = {
    "type": "object",
    "title": "Invite",
    "properties": {
      "note": {
        "type": "string",
      },
    }
  }

  denyNoteSchema = {
    "type": "object",
    "title": "Invite",
    "required": [
      "note"
    ],
    "properties": {
      "note": {
        "title": "Reason for deny",
        "type": "string",
      },
    }
  }

  form = [
    {
      "key": "note",
      "type": "textarea",
      "placeholder": "Type your note.."
    },
    {
      "type": "submit",
      "style": "btn btn-primary text-end mb-3 fw-bold text-capitalize",
      "title": "Submit"
    }
  ]
  apiUrl: any;
  claimData: any;
  attestationData: any;
  entity: any;
  osid: any;
  propertyData: any[] = [];
  claimEntity: any;
  claimEntityId: any;
  profileData: any;
  profile: boolean;
  note: any = "";
  table: any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public attestationService: AttestationService,
    public teacherProfileService: TeacherProfileService, public generalService: GeneralService
  ) {

    //this.router.getCurrentNavigation().extras.state.entityId;
    //this.claimBody = this.attestationService.studentEntity;
    // console.log("route res",  this.entityId)
  }

  ngOnInit(): void {

    // this.route.params.subscribe(params => {
    //   var data = JSON.parse(atob(params.id));
    //   console.log({ data });
    //   this.entityId = data.entity;
    //   this.claimId = data.id;
    //   console.log("params",this.entityId, this.claimId)
    // });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  
    
    console.log("router",this.router.url)
    // var tab_url = this.router.url
    this.route.params.subscribe(async params => {
      console.log("-------------------",params)
      this.table = (params['table']).toLowerCase()
      this.entity = (params['entity']).charAt(0).toUpperCase() + params['entity'].slice(1);
      this.claimId = params['id']
      if((params['entity']).includes('board')){
        console.log("board--",params['entity'])
        this.entity = params['entity']
      }
      this.apiUrl = `/${this.entity}/claims/${this.claimId}`;
      // await this.getData();
    });

    this.generalService.getData("/"+this.entity).subscribe((res) => {
      console.log("res",res)
      this.osid = res[0].osid;
    })

    this.generalService.getData(this.apiUrl).subscribe((res) => {
      // this.entityIdt = res[0].osid;
      this.claimEntityId = res.entityId
      this.claimEntity = res.entity;
      this.claimData = res;
      this.generalService.getData("/"+this.claimData.propertyURI).subscribe((res) => {
        console.log("res",res)
        this.attestationData = res;
        this.removeCommonFields();
        this.generateData()
      })
      this.generalService.getData("/"+this.claimEntity+"/"+this.claimEntityId).subscribe((res) => {
        console.log("profileData",res)
        this.profileData = res;
        this.profile = true
        // this.removeCommonFields();
        // this.generateData()
      })
    })

    
    //history.state;
    this.getStudentData();
  }

  generateData(){
    for (const [index, [key, value]] of Object.entries(Object.entries(this.attestationData))) {
      console.log("att", key, value)
      var temp_object = {};
      temp_object['title'] = (key).charAt(0).toUpperCase() + key.slice(1);
      temp_object['value'] = value;
      this.propertyData.push(temp_object);
    }
    console.log("propertyData",this.propertyData)
  }

  removeCommonFields() {
    var commonFields = ['osCreatedAt', 'osCreatedBy', 'osUpdatedAt', 'osUpdatedBy','_osAttestedData', 'osid','_osClaimId','_osState'];
    commonFields.forEach(element => {
      if(this.attestationData[element]){
        delete this.attestationData[element]
      }
      
    });
    // const filteredArray = this.attestationData.filter(function (x, i) {
    //   return commonFields.indexOf(x[i]) < 0;
    // });
  }

  getStudentData() {
    this.attestationService.getStudentProfile(this.entityId).subscribe((res) => {
      this.user = res;
    });
  }

  onAttestApproveReject(action,event) {
    // console.log("event--",JSON.stringify(event));
    // if(action == 'GRANT_CLAIM')
    // {
    //   this.note = event.note
    // }

    let data = {
      "action": action,
      "notes": this.note
  }
  console.log("data--",data);
    var url = "/"+this.entity+"/claims/"+this.claimId+"/attest"
    this.generalService.postData(url, data).subscribe((res) => {
      // alert('success');
      console.log(res);
      
    });
    this.router.navigate([this.entity,'attestation',this.table]).then(() => {
      window.location.reload();
    });


    //this.noteAdded = true;
    // this.router.navigate(['institute-attestation']);
    // window.location.reload();
  }

  onConsent() { }

  saveNote(event){
    // localStorage.setItem('note', JSON.stringify(event));
    console.log('evv',event.note);
    this.note = event.note
    this.noteAdded = true;

  }

  close(){
    console.log('here')
    this.router.navigate([this.entity,'attestation',this.table]);
  }

}
