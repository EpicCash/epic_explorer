import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TransServiceService } from '../../services/trans-service.service';

@Component({
  selector: 'epic-explorer-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document,public translate: TransServiceService) {}

  ngOnInit() {}

  public ChangeTheme() {
    this.document.body.classList.toggle('dark_theme');
  }
}
