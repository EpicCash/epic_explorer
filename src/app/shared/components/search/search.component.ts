import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransServiceService } from '../../services/trans-service.service';

@Component({
  selector: 'epic-explorer-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  search: string = '';
  constructor(private router: Router,public translate: TransServiceService) {}

  ngOnInit() {}

  onSearch(hash) {
    this.router.navigate(['blockdetail', hash]);
  }
}
