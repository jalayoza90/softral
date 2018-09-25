import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlMatchResult } from '@angular/router';
import { AppComponent } from './app.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { PrivacyPolicyComponent } from './modules/pages/privacy-policy/privacy-policy.component';
import { RulesConditionsComponent } from './modules/pages/rules-conditions/rules-conditions.component';
import { LoginComponent } from './common/modal/login/login.component';
import { ModalModule  } from 'ngx-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'pages',
        loadChildren: './modules/pages/pages.module#PagesModule'
      },
    ]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    HeaderComponent,
    FooterComponent,
    // PagesComponent,
    PrivacyPolicyComponent,
    RulesConditionsComponent,
    LoginComponent
  ],
  imports: [
    ModalModule.forRoot(),
    RouterModule.forRoot(routes,
      {
        // preloadingStrategy: PreloadAllModules,
        initialNavigation: 'enabled',
        onSameUrlNavigation: 'reload'
      }
    ),
    BrowserModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
