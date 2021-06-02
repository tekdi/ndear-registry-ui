import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchemaService } from 'src/app/services/data/schema.service';
import { InstituteProfileService } from 'src/app/services/institute/institute-profile.service';

@Component({
  selector: 'app-institute-profile-setup',
  templateUrl: './institute-profile-setup.component.html',
  styleUrls: ['./institute-profile-setup.component.scss']
})
export class InstituteProfileSetupComponent implements OnInit {
  header1: string = 'plain';
  //schema;

  schema = {
    "type": "object",
    "title": "Teacher",
    "definitions": {
      "BasicDetails": {
        "type": "object",
        "required": [
          "instituteName"
        ],
        "properties": {
          "instituteName": {
            "type": "string"
          }     
        }
      },
      "Address": {
        "type": "object",
        "required": [
          "Landmark",
          "Locality",
          "State",
          "District",
          "City",
          "pincode"
        ],
        "properties": {
          "Plot": {
            "type": "string"
          },
          "Street": {
            "type": "string"
          },
          "Landmark": {
            "type": "string"
          },
          "Locality": {
            "type": "string"
          },
          "State": {
            "type": "string"
          },
          "District": {
            "type": "string"
          },
          "City": {
            "title":"Village/Town/City",
            "type": "string"
          },
          "pincode": {
            "type": "number"
          },
        }
      },
      "WhatIsYourRole": {
        "type": "object",
        "required": [
          "role"
        ],
        "properties": {
          "role":{
            "type": "string",
            "enum": [
              "Head of department",
              "Principal"
            ]
          }
        }
      },
      "WhoIsAdmin": {
        "type": "object",
        "required": [
          "emailOrMobile"
        ],
        "properties": {
          "emailOrMobile":{
            "title": "Email id or Mobile",
            "type": "string"
          }
        }
      }
    },
    "properties": {
      "BasicDetails": {
        "$ref": "#/definitions/BasicDetails"
      },
      "gstin": {
        "title": "GSTIN ID",
        "type": "string"
      },
      "Address": {
        "title": "Address",
        "$ref": "#/definitions/Address"
      },
      "WhatIsYourRole": {
        "title": "What is your role?",
        "$ref": "#/definitions/WhatIsYourRole"
      },
      "WhoIsAdmin": {
        "title": "Invite admin to complete the setup",
        "$ref": "#/definitions/WhoIsAdmin"
      }
    }
  };
 
  form: [
    "*",
    {
      "type": "submit",
      "style": "btn btn-primary text-end mt-3 fw-bold text-capitalize",
      "title": "save"
    }
  ]
  instituteSchema = {};
  constructor(public router: Router, 
    public instituteProfileService: InstituteProfileService, 
    public Schema: SchemaService) {
    // this.Schema.getSchemas().subscribe((res)=>{
    //   console.log("res",res);
    //    this.schema = res;
    //    console.log(this.schema.definitions)
    //    this.instituteSchema = {
    //      "type": "object",
    //      "title": "Institute",
    //      "definitions": this.schema.definitions.Institute,
    //      "properties": {
    //        "Institute": {
    //          "$ref": "#/definitions/Institute"
    //        }
    //      }
    //    };
    // });
   }

  ngOnInit(): void {
    
  }
  yourOnSubmitFn(data){
    console.log(data)
    localStorage.setItem('admin-setup',"true");
    localStorage.setItem('institute-detail',JSON.stringify(data));

    

    const formData = {
      "instituteName": data.BasicDetails.instituteName,
      "address": {
        "plot":  data.Address.Plot,
        "street":  data.Address.Street,
        "landmark": data.Address.Landmark,
        "locality": data.Address.Locality,
        "state":  data.Address.State,
        "district":  data.Address.District,
        "village": "",
        "pincode": data.Address.pinCode
      },
      "establishmentYear": String(data.BasicDetails.YearOfEstablishmentOfInstitute),
      "gstnId": data.gstin,
      "contactNumber":  String(data.BasicDetails.ContactNumber),
      "email":  data.BasicDetails.Email,
      "website": "https://ghg.com",
      "category": "Primary",
      "schoolType":data.BasicDetails.SchoolType,
      "instituteManagement":  data.BasicDetails.ManagementOfInstitute,
      "committee": "yes",
      "adminName": data.BasicDetails.headPerson,
      "adminEmail": data.BasicDetails.Email,
      "adminMobile":  String(data.BasicDetails.ContactNumber)
      
    }


    this.instituteProfileService.postInstituteProfile(formData).subscribe((res) => {
      console.log({ res });
      if (res.responseCode == 'OK') {
        localStorage.setItem('institute-entity',res.result.School.osid);
      }

    });

    const url = this.router.createUrlTree(['/admin-mail'])
    window.open(url.toString(), '_blank')
    this.router.navigate(['institute-profile-select']);
   // this.router.navigate(['admin-mail']);
  }

}
