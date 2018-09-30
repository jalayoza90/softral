import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RulesConditionsComponent } from './rules-conditions/rules-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  },{
    path: 'about',
    component: AboutUsComponent
  },{
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },{
    path: 'rules-conditions',
    component: RulesConditionsComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
    CommonModule
  ],
  declarations: [AboutUsComponent, PagesComponent, PrivacyPolicyComponent, RulesConditionsComponent],
  exports: [RouterModule]
})
export class PagesModule { }
