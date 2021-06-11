import { Component, OnInit } from '@angular/core';
import { PanelsComponent } from  '../panels.component';

@Component({
  selector: 'app-demo-panel',
  templateUrl: './demo-panel.component.html',
  styleUrls: ['./demo-panel.component.scss']
})
export class DemoPanelComponent implements OnInit {

  constructor(private panel: PanelsComponent) { }

  ngOnInit() {
  }

  close() {
    this.panel.close();
  }
}