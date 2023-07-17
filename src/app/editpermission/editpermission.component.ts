import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { interval } from 'rxjs';
import { HealthcheckService } from '../services/healthcheck.service';
import { timer } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ThemePalette } from '@angular/material/core';
import { Color } from '@swimlane/ngx-charts';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { UserinfoService } from '../services/userinfo.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProjectDTO, ProjectService } from '../services/project.service';
import { StateServiceService } from '../services/state-service.service';
import { forkJoin } from 'rxjs';
import { TeamRoleDTO } from '../services/project.service';
export interface Team {
  teamName: string;
}

export interface TeamDTO {
  id: number;
  teamName: string;
  users: UserDTO[];
}

export interface TeamsWithRoles{
  TeamDTO:TeamDTO,
  role:String
}
export interface UserDTO {
  id: Number;
  firstname: string;
  lastname: string;
  email: string;
}
export interface usersWithRoles{
  userDTO:UserDTO,
  role:string
}
enum Role {
  VIEWER,
  EDITOR
}

@Component({
  selector: 'app-editpermission',
  templateUrl: './editpermission.component.html',
  styleUrls: ['./editpermission.component.css']
})
export class EditpermissionComponent implements OnInit {
  dropdownSettings: IDropdownSettings = {};

  showPopup = false;
  status = true;
  nbprojet = 0;
  numberPrometheusdown = 0;
  numberGrafanadown = 0;
  numberAlertManagerdown = 0;
  isManageTeam: boolean = false;
  isManageProject: boolean = false;
  isTeamMemberSelected = false;
  isProjectSelected = false;
  checked = false;
  indeterminate = false;
  labelPosition='Private';
  disabled = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dialog2: MatDialog,
    private userInfoService: UserinfoService,
    private projectService: ProjectService,
    private stateService: StateServiceService
  ) {}

  project!: ProjectDTO | null;
  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
    };
   // this.refresh();
    this.project = this.stateService.getProject();
    console.log("id"+this.project?.id); 
    this.getProjectUsers();
    //this.getUserRole();
    this.visibility=this.project?.visibility || "";
    this.labelPosition=this.visibility;
    //console.log("label"+this.labelPosition);
    this.getProjectTeams();


  }
visibility!:string;
setVisibility(){
  if(this.visibility ==="Private"){
    //this.labelPosition=1;
  }
}
  addToggle() {
    this.status = !this.status;
  }

  handleClose() {
    console.log('Popup closed');
  }

  goManageProject() {}

  goManageTeam() {}

  teamMemberSelected() {
    this.isTeamMemberSelected = !this.isTeamMemberSelected;
  }

  projectSelected() {
    this.isProjectSelected = !this.isProjectSelected;
  }

  manageProject() {
    this.isManageProject = !this.isManageProject;
  }

  goHome() {
    this.router.navigate(['/home']);
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



  showDialog2: boolean = false;
  openDialog2(): void {
    this.showDialog2 = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.panelClass = 'custom-dialog-panel'; // Add a custom CSS class to the dialog panel

    this.dialog.open(Dialog, dialogConfig);
  }

  closeDialog2() {
    this.showDialog2 = false;
  }

  showDialog3: boolean = false;
  openDialog3(): void {
    this.showDialog3 = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;

    this.dialog.open(Dialog, dialogConfig);
  }

  closeDialog3() {
    this.showDialog3 = false;
  }

  usersList: UserDTO[] = [];
  dropdownList: Array<{ item_id: Number; item_text: string }> = [];
  selectedUsers: any[] = [];

  getAllUsers() {
    this.userInfoService.getUsersList().subscribe(
      (usersList: UserDTO[]) => {
        this.usersList = usersList;
        console.log('Users list retrieved successfully:', this.usersList);

        // Populate the dropdownList with values from usersList
        this.dropdownList = this.usersList.map((user) => {
          return { item_id: user.id, item_text: `${user.firstname} ${user.lastname}` };
        });
        console.log('this.dropdownList', this.dropdownList);

        // Handle the response as needed
      },
      (error) => {
        console.error('Failed to retrieve users list:', error);
        // Handle the error as needed
      }
    );
  }

  onInstanceSelect() {}

  onInstanceDeSelect() {}

  onInstanceSelectAll() {}

  onInstanceDeSelectAll() {}

  userRole!: string;


  addUserToProject() {
    console.log('users', this.selectedUsers[0].item_id);
    const observables = [];
    for (let i = 0; i < this.selectedUsers.length; i++) {
      console.log("role changed");
      const observable = this.projectService.addUserToProject(this.project?.id || 0, Number(this.selectedUsers[i].item_id), this.userRole.toUpperCase());
      observables.push(observable);
    }
    forkJoin(observables).subscribe(
      (responses) => {
        console.log('All users added to team successfully:', responses);
        // Handle the response as needed
        this.showDialog2 = false;
        this.refresh();
      },
      (error) => {
        console.error('Failed to add user to team:', error);
      }
    );
    this.showDialog2 = false;
  }
  
  userDTO!: UserDTO[];
  userDTO2!: UserDTO[];


    getProjectUsers() {
    this.userDTO = this.project?.users || [];
    console.log("this.userDTO1"+this.userDTO)
    this.getUserRole();
  }
  teamsDTO!:TeamDTO[];

  teamsWithRolesDTO: TeamsWithRoles[] = [];

  getProjectTeams() {
    this.teamsDTO = this.project?.teams || [];
    if (this.project?.id != null) {
      for (let team of this.teamsDTO) {
        console.log("response" + team.id);
  
        this.projectService.getTeamRole(Number(this.project?.id), Number(team.id)).subscribe(
          (response: TeamRoleDTO) => {
            console.log("response" + response);
            this.teamsWithRolesDTO.push({ TeamDTO: team, role: response.role });
          },
          (error) => {
            console.error('Failed to update project:', error);
          }
        );
      }
    }
  }
  newTeamRole:string="";
  changeTeamRole(teamRole:TeamsWithRoles){
    if (teamRole.role === "EDITOR") {
      this.newTeamRole = "VIEWER";
    } else {
      this.newTeamRole = "EDITOR";
    }
    console.log("this.newRole" + this.newRole);
    if (this.project?.id != null) {
      const changeUserRole$ = this.projectService.changeTeamRole(this.newTeamRole, this.project.id, teamRole.TeamDTO.id);
      const refresh$ = this.refresh();
      console.log("role change 0");

      forkJoin([changeUserRole$, refresh$]).subscribe(
        () => {
          timer(3000).subscribe(() => {
            console.log("role changed");

            //location.reload();
          });
        },
        
        (error) => {
          console.error('Failed to retrieve change role or refresh', error);
        }
      );
    }
  }

  updateVisibility() {
    if (this.labelPosition === "Public") {
      this.project!.visibility = "Private";
    }
    if (this.labelPosition === "Private") {
      this.project!.visibility = "Public";
    }
    console.log("label" + this.labelPosition);
    console.log("label" + this.project!.visibility);
  
    this.projectService.updateProject(this.project?.id || 0, this.project).subscribe(
      (response) => {
        if (response === "Project updated successfully") {
          console.log("ok mrigl");
          this.labelPosition = this.project!.visibility;
        }
  
        // Handle the response as needed
      },
      (error) => {
        console.error('Failed to update project:', error);
        // Handle the error as needed
      }
    );
    this.labelPosition = this.project!.visibility;

    this.showDialog = false;
   // location.reload();
  }
  usersWithRoles: usersWithRoles[] = [];

  getUserRole() {
    console.log("this.userDTO[3]"+this.userDTO)
    for (let i = 0; i < this.userDTO.length; i++) {
      console.log("l mara "+i);
      this.userInfoService.getUserRoleByProject(this.project?.id || 0, this.userDTO[i].id).subscribe(
        (response:UserRoleDTO[]) => {
          console.log("UserRoleDTO"+response);
          this.usersWithRoles.push({ userDTO: this.userDTO[i], role: response[0].role });
         // console.log("role"+response[0].projectId);
      
        },  
        (error) => {
          console.error('Failed to update project:', error);
          // Handle the error as needed
        }
      );
    }
  
  }
  myProject!:ProjectDTO;
  refresh(){
    console.log("dkhal lena0");

    if(this.project?.id!=null){
      console.log("dkhal lena2");

        this.projectService.getAllProjects()
          .subscribe(
            (projects: ProjectDTO[]) => {
              console.log("dkhal lena3");

              for (let i=0;i<projects.length;i++){
                if((projects[i].id)=== this.project?.id){
                  console.log("projects[i].users"+projects[i].users);
                  this.stateService.setProject(projects[i]);
                  console.log("dkhal lena4");

                }
              }
              // Handle the response as needed
              location.reload();
            },
            (error) => {
              console.error('Failed to retrieve projects:', error);
              // Handle the error as needed
            }
          );
     

    }
  } 
  newRole="";

  changeProjectRole(userRole: string, userID: Number) {
    if (userRole === "EDITOR") {
      this.newRole = "VIEWER";
    } else {
      this.newRole = "EDITOR";
    }
    console.log("this.newRole" + this.newRole);
    if (this.project?.id != null) {
      const changeUserRole$ = this.projectService.changeUserRole(this.newRole, this.project.id, userID);
      const refresh$ = this.refresh();
      console.log("role change 0");

      forkJoin([changeUserRole$, refresh$]).subscribe(
        () => {
          timer(3000).subscribe(() => {
            console.log("role changed");

            //location.reload();
          });
        },
        
        (error) => {
          console.error('Failed to retrieve change role or refresh', error);
        }
      );
    }
  }
  

  dialog4: boolean = false;
  openDialog4(): void {
    this.dialog4 = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;

    this.dialog.open(Dialog, dialogConfig);
  }

  closeDialog4() {
    this.dialog4 = false;
  }
  userToDeleteID!:Number;
  userToDeleteInfo(userID:Number){
    console.log("userid"+userID);
    this.userToDeleteID=userID;
    console.log("this.userToDeleteID"+this.userToDeleteID);


  }
  deleteUser(){
    console.log("here");

    if(this.project?.id!=null){
      console.log("here");
      console.log("here"+this.project?.id);

      this.projectService.deleteUserFromProject(this.userToDeleteID,this.project?.id).subscribe(
        (response) => {
          console.log('User Deleted Successfully:', response);
          // Handle the response as needed
          this.dialog4 = false;
          this.refresh();
          timer(3000)


          location.reload();

        },
        (error) => {
          console.error('Failed to add user to team:', error);
          // Handle the error as needed
        }
      );

    }
  }
  showDialog6=false;
  addTeamToProject() {
    console.log('users', this.selectedUsers[0].item_id);
    const observables = [];
    for (let i = 0; i < this.selectedUsers.length; i++) {
      console.log("role changed");
      const observable = this.projectService.addTeamToProject(this.project?.id || 0, Number(this.selectedUsers[i].item_id), this.userRole.toUpperCase());
      observables.push(observable);
    }
    forkJoin(observables).subscribe(
      (responses) => {
        console.log('All users added to team successfully:', responses);
        // Handle the response as needed
        this.showDialog6 = false;
        this.refresh();
      },
      (error) => {
        console.error('Failed to add user to team:', error);
      }
    );
    this.showDialog6 = false;
  }
  openDialog6(): void {
    this.showDialog6 = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;

    this.dialog.open(Dialog, dialogConfig);
  }

  closeDialog6() {
    this.showDialog6 = false;
  }


  
}
export interface UserRoleDTO{
  roleId:number,
  projectId:number,
  userId:number,
  role:string
}