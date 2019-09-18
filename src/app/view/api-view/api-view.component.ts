import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-api-view',
  templateUrl: './api-view.component.html',
  styleUrls: ['./api-view.component.css']
})
export class ApiViewComponent implements OnInit {

  constructor() { }
   
  public email:string = environment.EMAIL;
  public angerstring:string ="mailto:"+ environment.EMAIL +"?subject = API-Request&body = Message";

  ngOnInit() {
  }

}
