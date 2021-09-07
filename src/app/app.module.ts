import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ServerService } from './server.service';
import {Routes, RouterModule} from '@angular/router';
import { DashBoardComponent} from './dash-board/dash-board.component';
import { AuthGuard } from './auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { TestListComponent } from './test-list/test-list.component';
import {ConfigService} from './config.service';
import {ParentRoutingModule} from './parent-routing.module';
import { DescriptionComponent } from './description/description.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthServiceService} from './auth-service.service';
import { FilterPipe } from './filter.pipe';
import {FormsModule} from '@angular/forms';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import { NotificationComponent } from './notification/notification.component';
import { WriteMessageComponent } from './write-message/write-message.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { AulabComponent } from './aulab/aulab.component';
import { Header1Component } from './header1/header1.component';
import { Header2Component } from './header2/header2.component';
import { AulabsampleComponent } from './aulabsample/aulabsample.component';
import { LabslistComponent } from './labslist/labslist.component';
import { Header3Component } from './header3/header3.component';
import { AupreviewComponent } from './aupreview/aupreview.component';
import { MyDatePickerModule } from 'mydatepicker';
import { Header4Component } from './header4/header4.component';
import { Header5Component } from './header5/header5.component';
import { RegisterComponent } from './register/register.component';
import { Header6Component } from './header6/header6.component';
import { ApproveComponent } from './approve/approve.component';
import { Header7Component } from './header7/header7.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { NewpassComponent } from './newpass/newpass.component';
import { ForgotComponent } from './forgot/forgot.component';
import {NgxPaginationModule} from 'ngx-pagination';

import {MatButtonModule} from "@angular/material";











const appRoutes: Routes =[
  {
   path: 'requests',
   component : ReactiveFormComponent
  },
  {
    path: '', 
    component : LoginFormComponent
  },
  {
    path: 'dashboard',
    component: DashBoardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashBoardComponent
  },
  
  {
    path: 'preview/:sample_id',
    component: PreviewPageComponent
  },
  
  
  {
    path: 'write-message',
    component: WriteMessageComponent
  },
  {
    path: 'aulab',
    component: AulabComponent
  },
  {
    path: 'aulabsample',
    component: AulabsampleComponent
  },
  {
    path: 'lablist',
    component: LabslistComponent
  },
  {
    path: 'aupreview',
    component: AupreviewComponent
  },

  {
    path: 'aupreview/:au_patient_id',
    component: AupreviewComponent
  },
  {
    path: 'update/:au_patient_id',
    component: AulabsampleComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'approve',
    component: ApproveComponent
  },
  {
    path: 'forgotpass',
    component: ForgotpassComponent
  },
  {
    path: 'newpass',
    component: NewpassComponent
  },
  
  
 
];

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    LoginFormComponent,
    DashBoardComponent,
    TestListComponent,
    DescriptionComponent,
    FilterPipe,
    PreviewPageComponent,
    NotificationComponent,
    WriteMessageComponent,
    SendMessageComponent,
    AulabComponent,
    Header1Component,
    Header2Component,
    AulabsampleComponent,
    LabslistComponent,
    Header3Component,
    AupreviewComponent,
    Header4Component,
    Header5Component,
    RegisterComponent,
    Header6Component,
    ApproveComponent,
    Header7Component,
    ForgotpassComponent,
    NewpassComponent,
    ForgotComponent
  ],
  imports: [
    NgxBarcodeModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    ParentRoutingModule,
    MyDatePickerModule,
    NgxPaginationModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes,{useHash:true}),
    ToastrModule.forRoot({ 
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    
  ],
  providers: [ServerService,AuthGuard,ConfigService,AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
