import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'epic-explorer-block-view-workspace',
  template: `
    <app-block-detail></app-block-detail>
  `,
  styles: [],
})
export class BlockViewWorkspaceComponent extends Utils
  implements OnInit, AfterViewInit {
  constructor(@Inject(DOCUMENT) public document: Document) {
    super(document);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.removeLoader();
  }
}
