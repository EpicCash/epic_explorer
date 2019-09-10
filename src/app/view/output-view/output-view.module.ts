import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutputViewRoutingModule } from './output-view-routing.module';
import { OutputDetailComponent } from './output-detail/output-detail.component';

@NgModule({
  declarations: [OutputDetailComponent],
  imports: [
    CommonModule,
    OutputViewRoutingModule
  ]
})
export class OutputViewModule { }
