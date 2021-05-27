import { Component, OnInit } from '@angular/core';
import { InstituteProfileService } from '../../../services/institute/institute-profile.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';
@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.scss']
})
export class InstituteProfileComponent implements OnInit {
  institute;
  affiliations;
  attestations;
  education;
  experience;
  user;
  header1: string = 'institute';
  tab: string = 'home';
  item: any;

  schema = {
    "type": "object",
    "title": "Affliliation",
    "properties": {
      "affiliationType": {
        "title": "Affiliation Board",
        "type": "string",
        "enum": ['CBSE Board', 'State Board']
      },
      "grantYear": {
        "title": "Grant Year",
        "type": "string",
        "format": "date",
        "widget": {
          "id": "date"
        },
      },
      "expiryYear": {
        "title": "Expiry Year",
        "type": "string",
        "format": "date"

      },
      "affiliationNumber": {
        "title": "Affiliation Number",
        "type": "string"
      },
      "send": {
        "title": " Send for verification?",
        "type": "boolean",
        "default": true
      }
    },
    "required": [
      "affiliationType",
      "grantYear",
      "affiliationNumber"
    ]
  };
  form: [
    '*',
    {
      "type": "submit",
      "style": "btn-info",
      "title": "save"
    }
  ]

  editschema = {
    "type": "object",
    "title": "Teacher",
    "definitions": {
      "BasicDetails": {
        "type": "object",
        "required": [
          "instituteName",
          "ContactNumber",
          "Email",
          "instututeType",
          "SchoolType",
          "ManagementOfInstitute",
          "YearOfEstablishmentOfInstitute",
          "headPerson",
          "trust"
        ],
        "properties": {
          "instituteName": {
            "type": "string"
          },
          "logoUrl": {
            "type": "string"
          },
          "ContactNumber": {
            "title": "Landline / Mobile",
            "type": "number"
          },
          "Email": {
            "type": "string"
          },
          "Website": {
            "type": "string"
          },
          "Social": {
            "type": "string"
          },
          "headPerson": {
            "title": "Principal / Dean / Head - Full Name",
            "type": "string"
          },
          "trust": {
            "title": "Name of Trust / Society / Managing Committee",
            "type": "string"
          },
          "instututeType": {
            "title": "Institute Category",
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "Primary only with grades 1 to 5",
                "Upper Primary with grades 1 to 8",
                "Higher Secondary with grades 1 to 12",
                "Upper Primary only with grades 6 to 8",
                "Higher Secondary with grades 6 to 12",
                "Secondary/Sr. Sec. with grades 1 to 10",
                "Secondary/Sr. Sec. with grades 6 to 10",
                "Secondary/Sr. Sec. only with grades 9 & 10",
                "Higher Secondary with grades 9 to 12",
                "Hr. Sec. /Jr. College only with grades 11 & 12"
              ]
            }

          },
          "SchoolType": {
            "title": "School Type",
            "type": "string",
            "enum": [
              "Boys",
              "Girls",
              "Co-ed"
            ]
          },
          "ManagementOfInstitute": {
            "title": "Management Of Institute",
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "Department of Education",
                "Tribal Welfare Department",
                "Local Body",
                "Government Aided",
                "Private Unaided (Recognized)",
                "Other Govt. managed schools",
                "Unrecognized",
                "Social Welfare Department",
                "Other Central Govt. Schools",
                "Ministry of Labour",
                "Kendriya Vidyalaya / Central School",
                "Jawahar Navodaya Vidyalaya",
                "Sainik School",
                "Railway School",
                "Central Tibetan School",
                "Madarsa Recognized (by Wakf board /Madarsa)",
                "Madarsa Unrecognized",
              ]
            }
          },
          "YearOfEstablishmentOfInstitute": {
            "type": "number"
          },
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
      }

    }
  };
  instituteEntity: string;

  constructor(
    public instituteProfileService: InstituteProfileService,
    public toastMsg: ToastMessageService
  ) { }

  ngOnInit(): void {
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    this.affiliations = JSON.parse(localStorage.getItem('affiliations'));
    this.attestations = JSON.parse(localStorage.getItem('education'));
    this.instituteEntity = localStorage.getItem('institute-entity');
    console.log(this.affiliations);


    this.instituteProfileService.getInstituteProfile(this.instituteEntity).subscribe((res) => {
      console.log({ res });

      this.institute.BasicDetails.instituteName = res.schoolName;
      this.institute.BasicDetails.Email = res.adminEmail;

      this.institute.BasicDetails.ContactNumber = res.adminMobile;
      this.institute.Address.District = res.address.district;
      this.institute.Address.State = res.address.state;
      this.institute.Address.pinCode = res.address.pinCode;

    });
  }

  onAffiliationSubmit(event) {
    console.log(event);
    // this.user.details = this.editform.value
    event.attested = "pending"
    event.note = "Attestation pending"
    this.affiliations = event;
    localStorage.setItem('affiliations', JSON.stringify(this.affiliations));
    // this.education = this.educationForm.value
  }

  onEditProfileSubmit(event) {
    this.institute = event;

    const data1 = {
      "schoolCode": "string",
      "schoolName": this.institute.BasicDetails.instituteName,
      "adminEmail": this.institute.BasicDetails.Email,
      "identifier": "",
      "adminMobile": String(this.institute.BasicDetails.ContactNumber),
      "address": {
        "addressLine1": this.institute.Address.Plot + ', ' + this.institute.Address.Street,
        "addressLine2": this.institute.Address.Landmark + ', ' + this.institute.Address.Locality,
        "district": this.institute.Address.District,
        "state": this.institute.Address.State,
        "pinCode": this.institute.Address.pinCode,
      }
    }

    const data= {
        "instituteName": this.institute.BasicDetails.instituteName,
        "address": {
          "plot":  this.institute.Address.Plot,
          "street":  this.institute.Address.Street,
          "landmark": this.institute.Address.Landmark,
          "locality": this.institute.Address.Locality,
          "state":  this.institute.Address.State,
          "district":  this.institute.Address.District,
          "village": "",
          "pincode": this.institute.Address.pinCode
        },
        "establishmentYear": String(this.institute.BasicDetails.YearOfEstablishmentOfInstitute),
        "gstnId": this.institute.gstin,
        "contactNumber":  String(this.institute.BasicDetails.ContactNumber),
        "email":  this.institute.BasicDetails.Email,
        "website": "https://ghg.com",
        "category": "Primary",
        "schoolType":this.institute.BasicDetails.SchoolType,
        "instituteManagement":  this.institute.BasicDetails.ManagementOfInstitute[0],
        "committee": "yes",
        "adminName": this.institute.BasicDetails.headPerson,
        "adminEmail": this.institute.BasicDetails.Email,
        "adminMobile":  String(this.institute.BasicDetails.ContactNumber)
    
  }


    this.instituteProfileService.postInstituteProfile(data).subscribe((res) => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        this.toastMsg.success('Success', 'Institude Profile added successfully');
        localStorage.setItem('institute-detail', JSON.stringify(this.institute));
      }

    });

  }

}


