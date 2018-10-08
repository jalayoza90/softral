import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FreelancerComponent } from './freelancer.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
const routes: Routes = [
  {
    path: '',
    component: FreelancerComponent,
  },{
    path: 'jobdetail',
    component: JobdetailComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
    CommonModule
  ],
  declarations: [FreelancerComponent, JobdetailComponent],
  exports: [RouterModule]
})
export class FreelancerModule { }
