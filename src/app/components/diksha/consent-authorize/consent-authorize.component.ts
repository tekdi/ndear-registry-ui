import { Component, OnInit ,  Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-consent-authorize',
  templateUrl: './consent-authorize.component.html',
  styleUrls: ['./consent-authorize.component.css']
})
export class ConsentAuthorizeComponent implements OnInit {
  @Output() acceptAuthorize = new EventEmitter<string>();
  @Output() cancelAuthorize = new EventEmitter<string>();


  header1: string = 'consent-auth';

  constructor() { }

  ngOnInit(): void {
  }

  accept(){
    this.acceptAuthorize.emit();
  }

  cancel(){
    this.cancelAuthorize.emit();
  }
  


}
