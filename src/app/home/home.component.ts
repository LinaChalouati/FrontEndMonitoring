import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { interval } from 'rxjs';
import { HealthcheckService } from '../services/healthcheck.service';
import { timer } from 'rxjs';
import{ProjectService} from "../services/project.service";
import{ProjectDTO} from "../services/project.service";
import {TeamRoleDTO, UserinfoService} from "../services/userinfo.service";
import{UserProjectsDTO} from "../services/userinfo.service";
import {DataService} from "../services/data-service.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Dialog} from "@angular/cdk/dialog";

export interface UserProjectsWithRoles{
  project:ProjectDTO,
  role:string,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

showPopup = false;
status = true;
nbprojet=0;
numberPrometheusdown=0;
numberGrafanadown=0;
numberAlertManagerdown=0;
nbServersup=0;
isUserAdmin:string="";
  constructor(
    private router: Router,
    private healthCheckService: HealthcheckService,
    private projectservice: ProjectService,
    private userinfoservice: UserinfoService,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }
ngOnInit(): void {
  this.checkHealth();
 // interval(12 * 1000) // 60 seconds = 1 minute
   // .subscribe(() => {
     // this.checkHealth();
   //   console.log("this.nbServersup"+this.nbServersup);

   // });
  console.log("email"+this.dataService.getLoginEmail());
  console.log("l id"+this.dataService.getUserInfo()?.user.id);
  this.getUserProjects(this.dataService.getLoginEmail() || "");
  this.getUserTeamsWithProjects(Number(this.dataService.getUserInfo()?.user.id));
  timer(3000);
  this.getPublicProjects();


  }
publicProjects!:ProjectDTO[];
userInfo!:UserProjectsDTO;
userProjects!:ProjectDTO[];
userProjectsWithRoles: UserProjectsWithRoles[] = [];
userTeamsProjects: TeamRoleDTO[] = [];
//lezem rectification f nb.project
  getPublicProjects() {
    this.projectservice.getPublicProjects().subscribe(
      (response) => {
        this.publicProjects = response.filter((publicProject) => {
          const projectExists = this.userTeamsProjects.some((teamRole) => teamRole.project.id === publicProject.id)
            || this.userProjectsWithRoles.some((userProjectWithRole) => userProjectWithRole.project.id === publicProject.id);
          return !projectExists;
        });
        //fiha retification
        this.nbprojet = this.publicProjects.length;

      },
      (error) => {
        console.error('Failed to get public projects', error);
      }
    );
  }

  getUserTeamsWithProjects(userID: number) {
    this.userinfoservice.getUserTeamsWithProjects(userID).subscribe(
      (response) => {
        this.userTeamsProjects = response;
        console.log("this.userTeamsProjects"+this.userTeamsProjects);
        // Store userInfo in DataService
        this.dataService.setUserInfo(this.userInfo);



      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
projectIDToDelete:Number=0;
  getProjectIDToDelete(projectID:Number){
    this.projectIDToDelete=projectID;
  }
  deleteProject(){
    this.projectservice.deleteProject(this.projectIDToDelete).subscribe(
      (response) =>{
        if(response){
          console.log("deleted");

        }
        else{
          console.error("maha2ah");

        }

      },
      error => {
        console.error("maha2ah");
      }
    )
    location.reload();
    this.showDialog=false;

  }


    getUserProjects(email: string) {
      this.userinfoservice.getUserInfo(email).subscribe(
        (response) => {
          this.userInfo = response;
          this.isUserAdmin = (this.userInfo.user.role).toString();
          this.userProjects = this.userInfo.projects;

          // Store userInfo in DataService
          this.dataService.setUserInfo(this.userInfo);

          for (let i = 0; i < this.userInfo.projects.length; i++) {
            this.userProjectsWithRoles.push({
              project: this.userInfo.projects[i],
              role: this.userInfo.userRole[Number(this.userInfo.projects[i].id)]
            });
          }



        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
goAdminsitration(){
  this.router.navigate(['/administration']);
}
goProfile(){
  this.router.navigate(['/profile']);

}
  goEditProject(projectID:Number){
    this.dataService.setProjectIDToModify(projectID);
    console.log("projectID"+projectID);
    this.router.navigate(['/projectedit']);
  }
  showDialog: boolean = false;
  openDialog(): void {
    this.showDialog = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;

    this.dialog.open(Dialog, dialogConfig);

  }


  closeDialog() {
    this.showDialog = false;

  }

addToggle()
{
  this.status = !this.status;
}

  handleClose() {
    console.log("Popup closed");
  }
  private checkHealth(): void {
    const toast4 = document.getElementById("toast-message4")!;
    const toast2 = document.getElementById("toast-message2")!;
    const toast3 = document.getElementById("toast-message3")!;

    this.healthCheckService.checkPrometheusHealth().subscribe(
      (isUp) => {
        console.log('Prometheus is up:', isUp);

        toast4.innerHTML = isUp ? "Prometheus is UP!" : "Prometheus is DOWN!";
        toast4.classList.remove("toast4-success", "toast4-failed");
        toast4.classList.add("toast4", isUp ? "toast4-success" : "toast4-failed", "show");
        if(isUp==true){
            this.numberPrometheusdown=0;
        }
        else{
          this.numberPrometheusdown+=1;
          if(this.numberPrometheusdown==5){
            timer(3000);
            this.restartPrometheus();
          }

        }
        console.log("down down"+this.numberPrometheusdown);
        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast4.classList.remove("show");
        }, 7000);
      },
      (error) => {
        console.error('Error occurred while checking Prometheus health:', error);

        toast4.innerHTML = "Error Modifying Failed!";
        toast4.classList.remove("toast4-success");
        toast4.classList.add("toast4", "toast4-failed");
        console.log("mche lenaaa");

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast4.classList.remove("show");
        }, 7000);
      }
    );

    this.healthCheckService.checkGrafanaHealth().subscribe(
      (isUp) => {
        console.log('Grafana is up:', isUp);

        toast2.innerHTML = isUp ? "Grafana is UP!" : "Grafana is DOWN!";
        toast2.classList.remove("toast2-success", "toast2-failed");
        toast2.classList.add("toast2", isUp ? "toast2-success" : "toast2-failed", "show");



        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast2.classList.remove("show");
        }, 7000);
      },
      (error) => {
        console.error('Error occurred while checking Grafana health:', error);

        toast2.innerHTML = "Error Modifying Failed!";
        toast2.classList.remove("toast2-success");
        toast2.classList.add("toast2", "toast2-failed");

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast2.classList.remove("show");
        }, 7000);
      }
    );

    this.healthCheckService.checkAlertmanagerHealth().subscribe(
      (isUp) => {
        console.log('Alertmanager is up:', isUp);

        toast3.innerHTML = isUp ? "Alertmanager is UP!" : "Alertmanager is DOWN!";
        toast3.classList.remove("toast3-success", "toast3-failed");
        toast3.classList.add("toast3", isUp ? "toast3-success" : "toast3-failed", "show");

        if(isUp==true){
          this.numberAlertManagerdown=0;
        }
        else{
          this.numberAlertManagerdown+=1;
          if(this.numberAlertManagerdown==5){
            timer(3000);
            this.restartAlertManager();
          }

        }

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast3.classList.remove("show");
        }, 7000);
      },
      (error) => {
        console.error('Error occurred while checking Alertmanager health:', error);

        toast3.innerHTML = "Error Getting Status Failed!";
        toast3.classList.remove("toast3-success");
        toast3.classList.add("toast3", "toast3-failed");

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast3.classList.remove("show");
        }, 7000);
      }
    );
  }


  restartPrometheus(): void {
    const toast5 = document.getElementById("toast-message5")!;

    this.healthCheckService.restartPrometheusContainer().subscribe(
      (isRestarted) => {
        if (isRestarted) {
          toast5.innerHTML = "Prometheus Restarted!";
          toast5.classList.remove("toast5-failed");
          toast5.classList.add("toast5", "toast5-success", "show");
        } else {
          toast5.innerHTML = "Failed to restart Prometheus!";
          toast5.classList.remove("toast5-success");
          toast5.classList.add("toast5", "toast5-failed", "show");
        }

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast5.classList.remove("show");
        }, 7000);
      },
      (error) => {
        console.error('Error occurred while restarting Prometheus:', error);

        toast5.innerHTML = "Failed to restart Prometheus!";
        toast5.classList.remove("toast5-success");
        toast5.classList.add("toast5", "toast5-failed", "show");

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast5.classList.remove("show");
        }, 7000);
      }
    );
  }

  restartAlertManager(): void {
    const toast6 = document.getElementById("toast-message6")!;

    this.healthCheckService.restartAlertManagerContainer().subscribe(
      (isRestarted) => {
        if (isRestarted) {
          toast6.innerHTML = "AlertManager Restarted!";
          toast6.classList.remove("toast6-failed");
          toast6.classList.add("toast6", "toast6-success", "show");
        } else {
          toast6.innerHTML = "Failed to restart AlertManager!";
          toast6.classList.remove("toast6-success");
          toast6.classList.add("toast6", "toast6-failed", "show");
        }

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast6.classList.remove("show");
        }, 7000);
      },
      (error) => {
        console.error('Error occurred while restarting AlertManager:', error);

        toast6.innerHTML = "Failed to restart AlertManager!";
        toast6.classList.remove("toast6-success");
        toast6.classList.add("toast6", "toast6-failed", "show");

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast6.classList.remove("show");
        }, 7000);
      }
    );
  }

}




