import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-institutes',
  templateUrl: './board-institutes.component.html',
  styleUrls: ['./board-institutes.component.css']
})
export class BoardInstitutesComponent implements OnInit {
displayResult : boolean = false;
  constructor() { }
 
  ngOnInit(): void {
  }

  showResult(){
    this.displayResult = !this.displayResult;
  }

}
