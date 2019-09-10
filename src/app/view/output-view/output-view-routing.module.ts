import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutputDetailComponent } from './output-detail/output-detail.component';

const routes: Routes = [  {
  path: '',
  component: OutputDetailComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputViewRoutingModule { }
