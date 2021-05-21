import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-institutes',
  templateUrl: './board-institutes.component.html',
  styleUrls: ['./board-institutes.component.css']
})
export class BoardInstitutesComponent implements OnInit {
displayResult : boolean = false;
header1: string = 'board';
institutes = [];
tab: string = 'institutes';
schema = {
  "type": "object",
  "title": "Invite",
  "properties": {
    "emails": {
      "title": "Enter email Id",
      "type": "string",
    },
    "mobiles": {
      "title": "Enter mobile number",
      "type": "string",
    }
  }
}

form = [
  {
    "key": "emails",
    "type": "textarea",
    "placeholder": "Enter Email Ids seperated by comma"
  },
  {
    "key": "mobiles",
    "type": "textarea",
    "placeholder": "Enter Mobile Numbers seperated by comma"
  },
  {
    "type": "submit",
    "style": "btn btn-primary text-end mb-3 fw-bold text-capitalize",
    "title": "Send Invite"
  }
]
  constructor(public router: Router) { }
 
  ngOnInit(): void {
  }

  showResult(){
    this.displayResult = !this.displayResult;
  }

  oninviteSubmit(event){
    // console.log(event);
    // this.user.details = this.editform.value
    event.emails = event.emails.split(',');
    event.mobiles = event.mobiles.split(',');
    event.emails.forEach(email => {
      var teacher = {
        'email': email,
        'mobile': '-'
      }
      this.institutes.push(teacher)
    });
    event.mobiles.forEach(mobile => {
      var teacher = {
        'email': '-',
        'mobile': mobile
      }
      this.institutes.push(teacher)
    });
    // this.institutes = event;
    // this.institutes.mobiles.concat(event.emails);
    console.log(this.institutes)
    localStorage.setItem('institutes-invite', JSON.stringify(this.institutes));
    const url = this.router.createUrlTree(['/hod-mail'])
    window.open(url.toString(), '_blank')
        // this.educationForm.reset();
      }

}
