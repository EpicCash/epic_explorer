import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Utils } from 'src/app/shared/utils';

import { TransServiceService } from '../../../shared/services/trans-service.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent extends Utils implements OnInit, AfterViewInit {
  constructor(public translate: TransServiceService) {
    super(document);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.removeLoader();
  }
}
