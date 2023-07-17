import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupformComponent } from './popupform/popupform.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import these modules
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GridsterModule } from 'angular-gridster2';
import { DndModule } from 'ngx-drag-drop';
import { WidgetgrafanaComponent } from './widgetgrafana/widgetgrafana.component';
import { HttpClientModule } from '@angular/common/http';
import { DraggableIframeComponent } from './draggable-iframe/draggable-iframe.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertsComponent } from './alerts/alerts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddpanelpopupComponent } from './addpanelpopup/addpanelpopup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditdashboardComponent } from './editdashboard/editdashboard.component';
import { PaneleditComponent } from './paneledit/paneledit.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DraftdndComponent } from './draftdnd/draftdnd.component';
import { ScratchalertComponent } from './scratchalert/scratchalert.component';
import { Login2Component } from './login2/login2.component';
import { TestalertComponent } from './testalert/testalert.component';
import { AddalertComponent } from './addalert/addalert.component';
import {MatIconModule} from '@angular/material/icon';

import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NgPipesModule} from 'ngx-pipes';
import { MailsettingsComponent } from './mailsettings/mailsettings.component';
import { ProfileComponent } from './profile/profile.component';
import { AdvancedmetricssettingsComponent } from './advancedmetricssettings/advancedmetricssettings.component';
import { DialogComponent } from './dialog/dialog.component';
import { ProjectinfoComponent } from './projectinfo/projectinfo.component';
import { AdministrationComponent } from './administration/administration.component';
import { ManageprojectsComponent } from './manageprojects/manageprojects.component';
import { EditpermissionComponent } from './editpermission/editpermission.component';
import { MatRadioModule } from '@angular/material/radio';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManageteamsComponent } from './manageteams/manageteams.component';
import { UsersComponent } from './users/users.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './security/auth-interceptor';
import { RulesComponent } from './rules/rules.component';
import { ProjecthomeeditComponent } from './projecthomeedit-component/projecthomeedit.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,  
    PopupformComponent, LoginComponent, WidgetgrafanaComponent, DraggableIframeComponent, DashboardComponent, AlertsComponent, PageNotFoundComponent, AddpanelpopupComponent, EditdashboardComponent, PaneleditComponent, DraftdndComponent, ScratchalertComponent, Login2Component, TestalertComponent, AddalertComponent, MailsettingsComponent, ProfileComponent, AdvancedmetricssettingsComponent, DialogComponent, ProjectinfoComponent, AdministrationComponent, ManageprojectsComponent, EditpermissionComponent, ManageusersComponent, ManageteamsComponent, UsersComponent, RulesComponent
    ,ProjecthomeeditComponent
  ],
  imports: [
    BrowserModule,MatDialogModule,
    BrowserAnimationsModule,FormsModule,ReactiveFormsModule,CommonModule,AppRoutingModule,
    DragDropModule,MatDialogModule,DndModule,HttpClientModule, 
    MatProgressSpinnerModule,MatProgressBarModule,MatChipsModule,MatDatepickerModule,MatNativeDateModule,
    MatButtonModule,MatRadioModule,
    CanvasJSAngularChartsModule,MatTabsModule,  NgxChartsModule,MatMenuModule,MatIconModule,NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule
,NgFor,MatSelectModule,MatFormFieldModule,NgMultiSelectDropDownModule,NgPipesModule


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
