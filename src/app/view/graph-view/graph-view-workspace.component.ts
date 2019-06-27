import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'epic-explorer-graph-view-workspace',
  template: `
    <app-graph-detail></app-graph-detail>
  `,
  styles: [],
})
export class GraphViewWorkspaceComponent extends Utils
  implements OnInit, AfterViewInit {
  constructor(@Inject(DOCUMENT) public document: Document) {
    super(document);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.removeLoader();
  }
}
