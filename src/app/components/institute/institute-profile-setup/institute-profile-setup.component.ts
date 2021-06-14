import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchemaService } from 'src/app/services/data/schema.service';
import { InstituteProfileService } from 'src/app/services/institute/institute-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-institute-profile-setup',
  templateUrl: './institute-profile-setup.component.html',
  styleUrls: ['./institute-profile-setup.component.scss']
})
export class InstituteProfileSetupComponent implements OnInit {
  header1: string = 'plain';
  schemaJson;
  instituteSchema;
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
            "title": "Village/Town/City",
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
          "role": {
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
          "emailOrMobile": {
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

  constructor(public router: Router,
    public instituteProfileService: InstituteProfileService,
    public Schema: SchemaService,
    public toastMsg: ToastMessageService,
    public keycloakService: KeycloakService) {
    this.Schema.getSchemas().subscribe((res) => {
      // console.log("res",res);
      this.schemaJson = res;
      delete this.schemaJson.definitions.Institute.properties.address;
      delete this.schemaJson.definitions.Institute.properties.affiliation;
      this.instituteSchema = {
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

      console.log('this.instituteSchema = ', this.instituteSchema);
    });
  }

  ngOnInit(): void {

    this.keycloakService.getToken().then((token)=>{
      console.log('keyCloak teacher token - ', token);
      localStorage.setItem('token', token);
    });


  }
  submitIntituteProfile(event) {
    console.log(event);

   let  data = event.Institute;
     data.Address = event.Address;

    console.log(data);

    localStorage.setItem('admin-setup', "true");
    localStorage.setItem('institute-detail', JSON.stringify(data));

    this.instituteProfileService.postInstituteProfile(data).subscribe((res) => {
      console.log({ res });
      if (res.responseCode == 'OK') {
        localStorage.setItem('institute-entity', res.result.Institute.osid);
        if (res.responseCode == 'OK' && !res.params.errmsg) {
          this.toastMsg.success('Success', 'Institute Profile created Successfully');
        } else {
          this.toastMsg.error('Error', res.params.errmsg);
        }
      }

    });

    const url = this.router.createUrlTree(['/admin-mail'])
    window.open(url.toString(), '_blank')
    this.router.navigate(['institute-profile-select']);
     this.router.navigate(['admin-mail']);
  }

}
