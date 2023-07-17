import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { interval } from 'rxjs';
import { HealthcheckService } from '../services/healthcheck.service';
import { timer } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { ProjectService } from '../services/project.service';
import { param } from 'jquery';
import { StateServiceService } from '../services/state-service.service';
export interface ProjectDTO{
  id: Number;
  projectName: string;
  monitoring: boolean;
  alerting: boolean;
  appType: string;
  ipAddresses: string;
  msnames: string;
  uid: string;
  deployment: string;
  visibility: string;
  teams: TeamDTO[];
  users: UserDTO[];
}
export interface TeamDTO {
  id: number;
  teamName: string;
  users: UserDTO[];
}
export interface UserDTO{
   id:Number
   firstname:string,
  lastname:string
  email:string
    role:Role;
}
enum Role{
  VIEWER,
  EDITOR
}

@Component({
  selector: 'app-manageprojects',
  templateUrl: './manageprojects.component.html',
  styleUrls: ['./manageprojects.component.css']
})
export class ManageprojectsComponent {




  showPopup = false;
status = true;
nbprojet=0;
numberPrometheusdown=0;
numberGrafanadown=0;
numberAlertManagerdown=0;
isManageTeam:boolean=false;
isManageProject:boolean=false;
isTeamMemberSelected=false;
isProjectSelected=false;
projects: ProjectDTO[] = [];

constructor(private router: Router,private projectService:ProjectService,
  private stateService:StateServiceService) { }

ngOnInit(): void {

this.fetchProjects();
}

addToggle()
{
  this.status = !this.status;
}

  handleClose() {
    console.log("Popup closed");
  }
  goManageProject(){

  }
  goManageTeam(){
    
  }
  teamMemberSelected(){
    this.isTeamMemberSelected=!this.isTeamMemberSelected;
  }
  projectSelected(){
    this.isProjectSelected=!this.isProjectSelected;
  }
  manageProject(){
    this.isManageProject=!this.isManageProject;
  }
  goHome(){
    this.router.navigate(['/home']); 
   }
   editPermission(project:ProjectDTO){
    this.stateService.setProject(project);
    console.log("project"+project.id)
    console.log("project"+this.stateService.getProject()?.id)

    this.router.navigate(['/editpermission']); 
   }
   fetchProjects(): void {
    this.projectService.getAllProjects()
      .subscribe(
        (projects: ProjectDTO[]) => {
          this.projects = projects;
          console.log('Projects retrieved successfully:', this.projects);
          // Handle the response as needed
        },
        (error) => {
          console.error('Failed to retrieve projects:', error);
          // Handle the error as needed
        }
      );
  }



}
