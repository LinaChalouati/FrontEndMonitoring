import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { interval } from 'rxjs';
import { HealthcheckService } from '../services/healthcheck.service';
import { timer } from 'rxjs';
import{DataService} from "../services/data-service.service";
import {UpdateProfileRequest, UserProjectsDTO} from "../services/userinfo.service";
import{UserinfoService} from "../services/userinfo.service";
import{AuthenticationRequest} from "../services/userinfo.service";
import{User} from "../services/userinfo.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  status = true;


  constructor(private router: Router,private healthCheckService: HealthcheckService,private dataService:DataService,
              private userInfoService:UserinfoService) { }
  userInfo!: UserProjectsDTO |null;
ngOnInit(): void {

  if (this.dataService.getUserInfo() !== null) {
    this.userInfo = this.dataService.getUserInfo();
    if(this.userInfo){
      this.oldEmail=this.userInfo?.user.email;
      this.firstname=this.userInfo?.user.firstname;
      this.lastname=this.userInfo?.user.lastname;
      this.email=this.userInfo?.user.email;

      console.log(this.firstname);
    }

  }

}
firstname="";
lastname="";
password="";
newpassword="";
verifypassword="";
email="";
oldEmail="";
goHome(){
  this.router.navigate(['/home']);
}
goAdminsitration(){
  this.router.navigate(['/administration']);
}

addToggle()
{
  this.status = !this.status;
}

  handleClose() {
    console.log("Popup closed");
  }
  isEdit=false;
  isEditable=[false,false];
  editInformation(){
    this.isEdit=true;
  }

  editProfile() {
    const user: User = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      role: "USER",
      password: this.newpassword, // Encode the password
    };

    const credentials: AuthenticationRequest = {
      email: this.oldEmail,
      password: this.password
    };

    const updateProfileRequest: UpdateProfileRequest = {
      credentials: credentials,
      user: user
    };
  console.log(updateProfileRequest.user.password)
    this.userInfoService.updateProfile(updateProfileRequest).subscribe(
      () => {
        console.log("Profile updated");
        // this.router.navigate(['/']);
      },
      (error) => {
        console.error('Profile update failed', error);
      }
    );
  }
}





