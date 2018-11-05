import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlMatchResult } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ApisService } from "./services/apis.service";
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { LoginComponent } from './common/modal/login/login.component';
import { ModalModule  } from 'ngx-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FindTalentComponent } from './modules/find-talent/find-talent.component';
import { HowItWorksComponent } from './modules/how-it-works/how-it-works.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { LoginService } from './common/modal/login/login.service';
import { RegisterService } from './signup/signup.service';
import { MyModalComponent } from './common/modal/my-modal/my-modal.component';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'pages',
        loadChildren: './modules/pages/pages.module#PagesModule'
      },
      {
        path: 'freelancer',
        loadChildren: './modules/freelancer/freelancer.module#FreelancerModule'
      },
      {
        path: 'find-talent',
        component: FindTalentComponent
      },
      {
        path: 'how-it-works',
        component: HowItWorksComponent
      },
      {
        path: 'user',
        loadChildren: './modules/user/user.module#UserModule'
      },
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    HeaderComponent,
    FooterComponent,
    // PagesComponent,
    
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    FindTalentComponent,
    HowItWorksComponent,
    MyModalComponent
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
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [ApisService, LocalStorageService, LoginService, RegisterService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, MyModalComponent]
})
export class AppModule { }
