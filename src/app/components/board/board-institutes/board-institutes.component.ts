import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardInstituteService } from '../../../services/board/board-institutes/board-institutes.service';
import { InviteService } from '../../../services/invite/invite.service';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';

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
boardList: any;
schema = {
  "type": "object",
  "title": "Invite",
  "properties": {
    "emails": {
      "title": "Enter email Id",
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
    "type": "submit",
    "style": "btn btn-primary text-end mb-3 fw-bold text-capitalize",
    "title": "Send Invite"
  }
]
  constructor(
    public router: Router,
    public boardInstituteService: BoardInstituteService,
    public inviteService: InviteService,
    public toastMsg: ToastMessageService) { }
 
  ngOnInit(): void {

   this.boardInstituteService.getBordInstitute().subscribe(res=>{
    this.boardList = res;
    console.log(this.boardList);


  }, (err)=>{
    console.log({err});

  });

  }

  showResult(){
    this.displayResult = !this.displayResult;
  }

  oninviteSubmit(event){
    // console.log(event);
    // this.user.details = this.editform.value
    if (event.emails.indexOf(',') > -1) { 
      event.emails = event.emails.split(',');
      event.emails.forEach(email => {
        var teacher = {
          'email': email,
          'mobile': '-'
        }
        this.institutes.push(teacher)
      });
     }
     else{
      var teacher = {
        'email': event.emails,
        'mobile': '-'
      }
      this.institutes.push(teacher)
     }

     let data =  {
      'email': event.emails,
      'mobile': event.emails
    };


     this.inviteService.inviteInstitute(data).subscribe((res) => {
      if (res.responseCode == 'OK' && !res.params.errmsg) {
        this.toastMsg.success('Success', 'Invited successfully');
      } else {
        this.toastMsg.error('Error', res.params.errmsg);
      }
    }, (err) => {

      console.log({ err });

    });
    
    // event.mobiles = event.mobiles.split(',');

    // event.mobiles.forEach(mobile => {
    //   var teacher = {
    //     'email': '-',
    //     'mobile': mobile
    //   }
    //   this.institutes.push(teacher)
    // });
    // this.institutes = event;
    // this.institutes.mobiles.concat(event.emails);
    console.log(this.institutes)
    localStorage.setItem('institutes-invite', JSON.stringify(this.institutes));
    const url = this.router.createUrlTree(['/hod-mail'])
    window.open(url.toString(), '_blank')
        // this.educationForm.reset();
      }

}
