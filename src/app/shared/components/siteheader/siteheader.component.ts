import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'epic-explorer-siteheader',
  templateUrl: './siteheader.component.html',
  styleUrls: ['./siteheader.component.css'],
})
export class SiteheaderComponent implements OnInit {
  search: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {}

  ngOnInit() {}

  public ChangeTheme() {
    this.document.body.classList.toggle('dark_theme');
  }

  onSearch(hash) {
    this.router.navigate(['blockdetail', hash]);
  }
}
