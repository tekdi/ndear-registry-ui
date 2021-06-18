import { Component, OnInit } from '@angular/core';
import { InstituteProfileService } from '../../../services/institute/institute-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
import { SchemaService } from 'src/app/services/data/schema.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.scss']
})
export class InstituteProfileComponent implements OnInit {
  institute : any;
  affiliations;
  attestations;
  education;
  experience;
  user;
  header1: string = 'institute';
  tab: string = 'home';
  item: any;
  editSchema;
  schemaJson;
  instituteId;
  affiliationSchema;


  form: [
    '*',
    {
      "type": "submit",
      "style": "btn-info",
      "title": "save"
    }
  ]

  instituteEntity: string;

  constructor(
    public instituteProfileService: InstituteProfileService,
    public toastMsg: ToastMessageService,
    public Schema: SchemaService,
    public router: Router,
    private route: ActivatedRoute
      ) {

    this.Schema.getSchemas().subscribe((res) => {
      this.schemaJson = res;
      delete this.schemaJson.definitions.Institute.properties.affiliation;
      delete this.schemaJson.definitions.Institute.properties.address;


      console.log(this.schemaJson);

      // this.editSchema = {
      //   "type": "object",
      //   "title": "Institute",
      //   "definitions": {
      //     "Institute": this.schemaJson.definitions.Institute,
      //     "Address": this.schemaJson.definitions.Address
      //   },
      //   "properties": {
      //     "Institute": {
      //       "$ref": "#/definitions/Institute"
      //     },
      //     "Address": {
      //       "$ref": "#/definitions/Address"
      //     }
      //   }
      // };

      this.editSchema = {
        "type": "object",
        "title": "Teacher",
        "definitions": {
          "Institute": this.schemaJson.definitions.Institute,
          "Address": this.schemaJson.definitions.Address,
        },
        "properties": {
          "Institute": {
            "$ref": "#/definitions/Institute"
          },
          "Address": {
            "$ref": "#/definitions/Address"
          }
        }
      }

      console.log('editSchema - ', this.editSchema);

      this.affiliationSchema = {
        "type": "object",
        "properties": this.schemaJson.definitions.Affiliation.properties
      };

    });
  }

  ngOnInit(): void {
    this.attestations = JSON.parse(localStorage.getItem('education'));
    this.instituteEntity = localStorage.getItem('institute-entity');
    console.log(this.affiliations);


    this.route.params.subscribe(params => {
      console.log("route", params)
    //  this.instituteId = params['id'];

     // this.instituteId = (params['id']) ? params['id'] : localStorage.getItem('institute-entity');
    });
    this.getInstituteData(this.instituteId);
  }

  onAffiliationSubmit(event) {
    console.log(event);
   // alert('hi');
    // this.user.details = this.editform.value
    event.attested = "pending";
    event.note = "Attestation pending";
    delete this.institute.Institute;
    // this.education = this.educationForm.value

    if (!this.institute.hasOwnProperty('affiliation')) {
      this.institute.affiliation =  event
    
    } /*else {
      this.institute.affiliation.push(
        event
      );
    }*/
    console.log(' add afflilication -', this.institute);
    
    this.instituteProfileService.putInstituteProfile(this.institute, this.instituteId).subscribe(res => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        // localStorage.setItem('student_id', res.result.Student.osid);
      //  this.router.navigate(['/institute-profile', { 'id': this.instituteId }]);

        this.getInstituteData(this.instituteId);
        this.toastMsg.success('Success', 'Affiliation Deatils Added Successfully');
      }
    })

  }

  onEditProfileSubmit(event) {
    console.log(event);

   
    if(this.item)
    {
      if(this.institute.hasOwnProperty('Address')){
        if(event.hasOwnProperty('Address')){
          
          event.Address.osid= this.institute.Address.osid;       
         }
        
      }

     console.log(event);
     event.Institute['osid'] =  this.institute.osid;
      let data =  event;
      this.instituteProfileService.putInstituteProfile(data, this.instituteId).subscribe(res => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          //this.router.navigate(['/institute-profile', { 'id': this.instituteId }]);
  
          this.getInstituteData(this.instituteId);
          this.toastMsg.success('Success', 'Institute Details updated Successfully');
        }
      })

    }else{
      this.instituteProfileService.postInstituteProfile(event).subscribe((res) => {
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          this.toastMsg.success('Success', 'Institude Profile added successfully');
          this.router.navigate(['/institute-profile', { 'id': res.result.Institute.osid }]);
          this.getInstituteData(res.result.Institute.osid);
        }
      });
    }
  
  }

  getInstituteData(Id) {
    this.instituteProfileService.getInstituteProfile(Id).subscribe((res) => {
      this.institute = res[0];
      this.item =  { Institute : res[0]};
      this.instituteId = this.institute.osid;
     // this.item['Institute'] = res[0];
      console.log('this.institute- ', this.institute)
    })
  }



}


