import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { UserinfoService } from '../services/userinfo.service';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface User{
  firstname:string,
  lastname:string,
  role: string,
  email:string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {



  i=1;
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
  constructor(private http: HttpClient,private router: Router,private dialog: MatDialog,private userInfoservice:UserinfoService) { }

  ngOnInit(): void {
    timer(3000);
    this.getUsersList();

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
    showEditDialog=false;
    editRole(){
      this.showEditDialog=!this.showEditDialog;
    }
    seeProjects=false;
    showProjects(){
      this.seeProjects=!this.seeProjects;
    }
    
    goBack(){
      this.seeProjects=!this.seeProjects;
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
  showDialog4: boolean = false;
   openDialog4(): void {
    this.showDialog4 = true;
    const dialogConfig = new MatDialogConfig();
   dialogConfig.hasBackdrop = false;
   
   this.dialog.open(Dialog, dialogConfig);
   
 
  }
 
 
  closeDialog4() {
    this.showDialog4 = false;
 
  }
  showDialog5: boolean = false;
   openDialog5(): void {
    this.showDialog5 = true;
    const dialogConfig = new MatDialogConfig();
   dialogConfig.hasBackdrop = false;
   
   this.dialog.open(Dialog, dialogConfig);
 
  }
 
 
  closeDialog5() {
    this.showDialog5 = false;
 
  }
  createUser(){
    console.log("going");
  this.router.navigate(['/manageusers']);  

  //  this.router.navigate(['/administration']);  
}
usersList!:User[];
 getUsersList(){
  const url = 'http://localhost:8080/api/v1/users/users'; // Replace with your actual API endpoint

  this.http.get<any[]>(url)
    .subscribe(
      (response: any[]) => {
        // Store the user details array for later use

        this.usersList = response;

        // Call a function or perform any additional logic using the user details array

        // Alternatively, you can directly use the user details array in your template
        // by binding it to HTML elements

      },
      (error) => {
        // Handle the error here
        console.error(error);
      }
    );


}
newfirstname:string="";
newlastname:string="";
newrole:string="";
newemail:string="";
selectedRole:string="";
password:string="";
firstname:string="";
lastname:string="";
role:string="";
email:string="";
newpwd:string="";
oldemail:string="";
getUser(user:User){
  this.firstname=user.firstname;
  this.lastname=user.lastname;
  this.role=user.role;
  this.email=user.email;
  this.oldemail=user.email;

}
editUser(){
  //console.log("this.firstname"+this.newfirstname);
  //console.log("this.firstname"+this.newlastname)

  //console.log("this.firstname"+this.selectedRole)

  //console.log("this.firstname"+this.newemail)
  //console.log("this.firstname"+this.password)
  this.settingTheEditData();
  const userdata={
    firstname:this.firstname,
    lastname:this.lastname,
    email:this.email,
    role:this.role,
    password:this.newpwd
  }
  console.log("this.firstname"+userdata.firstname)
  console.log("this.firstname"+userdata.lastname)
  console.log("this.firstname"+userdata.email)
  console.log("this.firstname"+userdata.role)
  console.log("this.firstname"+userdata.password)
  console.log("this.firstname"+this.oldemail)

  this.userInfoservice.updateUser(this.oldemail, userdata)
  .subscribe(
    (response: boolean) => {
      if (response) {
        console.log("updated");
     
          this.closeDialog2();
        timer(3000)
         this.refreshPage();
        
      } else {
        console.log("oooops");
      }
    },
    (error) => {
      console.log("Error occurred");
    }
  );


  

}
settingTheEditData(){
  if(this.password!=""){
    this.newpwd=this.password;
  }
  if(this.newfirstname!=""){
    this.firstname=this.newfirstname;
  }
  if(this.newlastname!=""){
    this.lastname=this.newlastname;
  }
  if(this.newemail!=""){
    this.email=this.newemail;
  }
  if(this.selectedRole){
    this.role=this.selectedRole.toUpperCase();
  }
}
emailToDelete:string="";
getSelectedEmail(email:string){
  this.emailToDelete=email;

}
  deleteUser(){
  this.userInfoservice.deleteUser(this.emailToDelete).subscribe(
    (response) => {

      return true;
    },
    (error) => {
      // Handle the error here
      console.error(error);
    }
  );
    this.refreshPage();
  }
  
  refreshPage() {

    location.reload();
  }
  
}
