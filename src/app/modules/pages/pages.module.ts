import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  },{
    path: 'about',
    component: AboutUsComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
    CommonModule
  ],
  declarations: [AboutUsComponent, PagesComponent],
  exports: [RouterModule]
})
export class PagesModule { }
