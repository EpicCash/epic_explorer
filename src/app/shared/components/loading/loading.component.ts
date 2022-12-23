import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransServiceService } from '../../services/trans-service.service';

@Component({
  selector: 'epic-explorer-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

}
