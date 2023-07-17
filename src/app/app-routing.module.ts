import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PopupformComponent } from './popupform/popupform.component';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { DraggableIframeComponent } from './draggable-iframe/draggable-iframe.component';
import { AlertsComponent } from './alerts/alerts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddpanelpopupComponent } from './addpanelpopup/addpanelpopup.component';
import { EditdashboardComponent } from './editdashboard/editdashboard.component';
import { PaneleditComponent } from './paneledit/paneledit.component';
import { DraftdndComponent } from './draftdnd/draftdnd.component';
import { ScratchalertComponent } from './scratchalert/scratchalert.component';
import { Login2Component } from './login2/login2.component';
import { AddalertComponent } from './addalert/addalert.component';
import { TestalertComponent } from './testalert/testalert.component';
import { MailsettingsComponent } from './mailsettings/mailsettings.component';
import { ProfileComponent } from './profile/profile.component';
import { AdvancedmetricssettingsComponent } from './advancedmetricssettings/advancedmetricssettings.component';
import { AdministrationComponent } from './administration/administration.component';  
import { ManageprojectsComponent } from './manageprojects/manageprojects.component';
import { EditpermissionComponent } from './editpermission/editpermission.component';
import { ManageteamsComponent } from './manageteams/manageteams.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'popup', component: PopupformComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dragndrop', component: DraggableIframeComponent },
    { path: 'alert', component: AlertsComponent },
    { path: 'addpanelpopup', component: AddpanelpopupComponent },
    { path: 'editdash', component: EditdashboardComponent },
    { path: 'editpanel', component: PaneleditComponent },
    {path:'draft',component:DraftdndComponent},
    { path: 'alertsracth', component: ScratchalertComponent },
    { path: 'login2', component: Login2Component },
    { path: 'test', component: TestalertComponent },
    { path: 'addalert', component: AddalertComponent },
    { path: 'mailsettings', component: MailsettingsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'advancedsettings', component: AdvancedmetricssettingsComponent },
    { path: 'administration', component: AdministrationComponent },
    { path: 'manageprojects', component: ManageprojectsComponent },
    { path: 'editpermission', component: EditpermissionComponent },
    { path: 'manageteams', component: ManageteamsComponent },
    { path: 'manageusers', component: ManageusersComponent },
    { path: 'users', component: UsersComponent },







  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
