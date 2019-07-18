import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'epic-explorer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  TimeArr: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private chartService: ChartService,
  ) {}

  ngOnInit() {
    var self = this;
    var x = setInterval(function() {
      self.TimeArr = self.chartService.GetTimer()
        ? self.chartService.GetTimer()
        : false;
    }, 1000);
  }

  public ChangeTheme() {
    this.document.body.classList.toggle('dark_theme');
  }
}
