import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Dialog} from "@angular/cdk/dialog";
import {DataService} from "../services/data-service.service";

@Component({
  selector: 'app-projecthomeedit',
  templateUrl: './projecthomeedit.component.html',
  styleUrls: ['./projecthomeedit.component.css']
})
export class ProjecthomeeditComponent implements OnInit{

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
  isUserAdmin:string="" ;
  constructor(private router: Router,private dialog: MatDialog,private dataService:DataService) { }

  ngOnInit(): void {
      // @ts-ignore
      this.isUserAdmin=this.dataService.getUserInfo()?.user.role.toString();



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
  goProfile(){
    this.router.navigate(['/profile']);

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
    goAdminsitration(){
      this.router.navigate(['/administration']);
  }
  showDialog2: boolean = false ;
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

}