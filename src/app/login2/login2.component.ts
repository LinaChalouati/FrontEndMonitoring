import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UserinfoService } from '../services/userinfo.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
  password!:string;
  email!:string;

  constructor(private router: Router, private http: HttpClient,private userInfoService:UserinfoService) { }


  login() {
    const useremail=this.email;
    const userpwd=this.password
    console.log("this.email"+this.email);
  
    console.log("this.password"+this.password);
    this.userInfoService.login(useremail,userpwd);
    
  
  
  }
  
  


}