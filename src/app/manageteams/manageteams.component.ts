import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { TeaminfoService } from '../services/teaminfo.service';
import { UserinfoService } from '../services/userinfo.service';
import { timer } from 'rxjs';
// lezem n7othom f model wahadhom 
export interface Team {
  teamName:string
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
  selector: 'app-manageteams',
  templateUrl: './manageteams.component.html',
  styleUrls: ['./manageteams.component.css']
})
export class ManageteamsComponent {
  dropdownSettings:IDropdownSettings={};
  dropdownList: Array<{ item_id: Number; item_text: string;}> = [];
  selectedUsers: any[] = [];

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
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  constructor(private router: Router,private dialog: MatDialog,private teamInfoSerivce:TeaminfoService ,
    private userInfoService: UserinfoService) { }
  teams: TeamDTO[] = [];

  ngOnInit(): void {
    this.teamInfoSerivce.getAllTeams()
      .subscribe(
        (teams) => {
          this.teams = teams;
          console.log('Teams retrieved successfully:', this.teams);
          // Handle the response as needed
        },
        (error) => {
          console.error('Failed to retrieve teams:', error);
          // Handle the error as needed
        }
      );
      
    this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        enableCheckAll: true,
          };
  }
  getUsers(){
    
  }
  

  onInstanceSelect() {
    //console.log("this.selectedInstances", this.selectedInstances);

  
  }

  
  onInstanceDeSelect() {
   
  }

onInstanceSelectAll() {

}
onInstanceDeSelectAll() {
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
      this.router.navigate(['/home']);  }
  
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
     setAnotherRule(){
       this.showDialog = !this.showDialog;
     } 
     newTeamName:string="";
     newTeamId:string="";
     addTeam(){
      this.teamInfoSerivce.addTeam(this.newTeamName).subscribe(
        (response:number) => {
          // Handle the response
          console.log("lllllresponse"+(response));
            this.newTeamId=(response).toString();
            timer(3000)
            this.addUsers();
            this.refreshPage();

        },
        (error) => {
          // Handle the error
          console.error(error);
        }
      );

     }
     usersSelected!:any[];
     addUsers() {
      console.log("this.usersSelected.length"+this.usersSelected.length);
      for (let i = 0; i < this.usersSelected.length; i++) {
        this.teamInfoSerivce.addUserToTeam(
          (this.newTeamId),
          (this.usersSelected[i].item_id)
        ).subscribe(
          (response) => {
            console.log('User added to team successfully:', response);
            // Handle the response as needed
            this.showDialog2 != this.showDialog2;
          },
          (error) => {
            console.error('Failed to add user to team:', error);
            // Handle the error as needed
          }
        );
      }
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
   selectedTabIndex = 1; // Index of the second tab (0-based)

  seeTeamInfo=false;
  seeUsers(){
    this.seeTeamInfo=true;
    this.selectedTabIndex=2;
  }
  closeTeamInfo(){
    this.seeTeamInfo=false;
    this.selectedTabIndex=1;
    console.log("clowzed");

  }
  isShowInfo=false;
  showTeamInfo(){
    this.isShowInfo=!this.isShowInfo;
    this.selectedTabIndex=2;

  }
  goBack(){
    this.isShowInfo=!this.isShowInfo;
  }
  teamUsers: UserDTO[] = [];
  selectedTeamId!:number;
  getTeamsUsers(teamId:number){
    console.log("teamId"+teamId);
    this.selectedTeamId=teamId;
    this.teamInfoSerivce.getTeamUsers(teamId)
    .subscribe(
      (teamUsers) => {
        this.teamUsers = teamUsers;
  
        console.log('Team users retrieved successfully:', this.teamUsers);
        // Handle the response as needed
      },
      (error) => {
        console.error('Failed to retrieve team users:', error);
        // Handle the error as needed
      }
    );

  }
  usersList: UserDTO[] = []; // Declare usersList property

  getAllUsers() {
    this.userInfoService.getUsersList()
      .subscribe(
        (usersList: UserDTO[]) => {
          this.usersList = usersList;
          console.log('Users list retrieved successfully:', this.usersList);
  
          // Populate the dropdownList with values from usersList
          this.dropdownList = this.usersList.map((user) => {
            return { item_id: user.id, item_text: `${user.firstname} ${user.lastname}` };
          }); 
          console.log(this.dropdownList);
  
          // Handle the response as needed
        },
        (error) => {
          console.error('Failed to retrieve users list:', error);
          // Handle the error as needed
        }
      );
  }
  showDialog5=false;
  teamNameToDelete:string=""
  getTeamName(teamname:string){
    this.teamNameToDelete=teamname;
  }
  deleteTeam(){
    this.teamInfoSerivce.deleteTeam(this.teamNameToDelete).subscribe(
      (response) => {
        console.log('Team deleted successfully:', response);
        // Handle the response as needed
      },
      (error) => {
        console.error('Failed to delete team:', error);
        // Handle the error as needed
      }
    );
    this.showDialog5=!this.showDialog5;
    this.refreshPage();

  }

       openDialog5(): void {
       this.showDialog5 = true;
       const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = false;
      
      this.dialog.open(Dialog, dialogConfig);
  
     }
   
   
     closeDialog5() {
       this.showDialog5 = false;
   
     }
     refreshPage() {

      location.reload();
    }
    showDialog6=false;
    openDialog6(): void {
      this.showDialog6 = true;
      const dialogConfig = new MatDialogConfig();
     dialogConfig.hasBackdrop = false;
     
     this.dialog.open(Dialog, dialogConfig);
 
    }
    userIdToRemove!:Number;
    getUserInfoToRemove(userid:Number){
      this.userIdToRemove=userid;

    }
    closeDialog6() {
      this.showDialog6 = false;
    }
    deleteUser(){
      console.log("this.userIdToRemove"+this.userIdToRemove)
      console.log("this.selectedTeamId"+this.selectedTeamId)

      this.teamInfoSerivce.removeUserFromTeam(Number(this.userIdToRemove),(this.selectedTeamId)) .subscribe(
        (response) => {
          console.log('User removed from team successfully:', response);
          // Handle the response as needed
        },
        (error) => {
          console.error('Failed to remove user from team:', error);
          // Handle the error as needed
        }
      );
      this.showDialog6
      this.refreshPage();

      }

}
