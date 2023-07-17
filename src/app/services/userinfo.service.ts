import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { Observable, retry } from 'rxjs';
import { UserDTO } from './project.service';
import {ProjectDTO} from './project.service';

export interface UpdateProfileRequest{
  credentials:AuthenticationRequest,
  user:User
}
export interface TeamRoleDTO{
  teamName:string,
  projectId:number,
  teamId:number,
  role:teamRole,
  project:ProjectDTO
}
enum teamRole{
  VIEWER,
  EDITOR
}
export interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface User{
  firstname:string,
  lastname:string,
  role: string,
  email:string,
  password:string
}export interface UserProjectsDTO {
  user: UserDTO;
  projects: ProjectDTO[];
  userRole: any[];
}




export interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface User{
  firstname:string,
  lastname:string,
  role: string,
  email:string
}
export interface UserRoleDTO{
  roleId:number,
  projectId:number,
  userId:number,
  role:string

}
@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private http: HttpClient,private router: Router) { }
  token!:string;
  userDetails: any[] = [];

  public login(email:string,password:string) {
    
      const request: AuthenticationRequest = {
        email: email,
        password: password
      };
      console.log("request"+request.email);
      console.log("request"+request.password);

      this.http.post<AuthenticationResponse>('http://localhost:8080/api/v1/auth/authenticate',request).subscribe(
        (response) => {
          // Handle the response
          console.log("lllllresponse"+(response.access_token));

          const token = response.access_token;
          console.log("tokenhereee"+token);
          console.log("response"+response.access_token);

          console.log("response"+response.refresh_token);
          localStorage.setItem('token', token); // Store the token in local storage
          
          this.goToHomePage();
        },
        (error) => {
          // Handle the error
          console.error(error);
        }
      );
    }
    goToHomePage(): void {
      this.router.navigate(['/home']);
  
    }

  getUserDetails():Observable<UserDTO[]> {
    const url = 'http://localhost:8080/api/v1/users/users'; 
  
  return  this.http.get<UserDTO[]>(url) ;
     

  }

  deleteUser(email:string) :Observable<Boolean> {
    const url = 'http://localhost:8080/api/v1/users/delete_users';
  
    return this.http.delete<Boolean>(url,{params: {email:email}});
      

  }

  public updateUser(email: string, updatedUser: User) {
    const url = 'http://localhost:8080/api/v1/users/update_user?email=' + encodeURIComponent(email);
  return this.http.put<boolean>(url, updatedUser);
  
  }
  usersList!:User[];

  getUsersList(): Observable<any[]> {
    const url = 'http://localhost:8080/api/v1/users/users'; // Replace with your actual API endpoint
  
    return this.http.get<any[]>(url);
  }
  getUserRoleByProject(projectId:Number,userID:Number):Observable<UserRoleDTO[]>{
    const url=`http://localhost:8080/api/projects/${projectId}/users/${userID}/roles`;
    return this.http.get<UserRoleDTO[]>(url);

  }

  
  getUserInfo(email:string):Observable<UserProjectsDTO>{
    const url=`http://localhost:8080/api/v1/users/user/user_info/${email}`;
    return this.http.get<UserProjectsDTO>(url);
  }
  updateProfile(UpdateProfileRequest:UpdateProfileRequest): Observable<boolean> {
    const url = `http://localhost:8080/api/v1/users/update_profile`;
    return this.http.put<boolean>(url,  UpdateProfileRequest);
  }
  getUserTeamsWithProjects(userID:number):Observable<TeamRoleDTO[]>{
    const url=`http://localhost:8080/api/v1/users/${userID}/teams/projects`;
    return this.http.get<TeamRoleDTO[]>(url);
  }

}
