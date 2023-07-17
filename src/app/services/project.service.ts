import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateServiceService } from './state-service.service';
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
  teams: TeamDTO[];
  users: UserDTO[];
  visibility: string;
}
export interface TeamDTO {
  id: number;
  teamName: string;
  users: UserDTO[];
}
export interface TeamRoleDTO{
  projectID:number,
  teamID:number,
  role:string
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
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>('http://localhost:8080/api/project/get-all-projects');
  }
  addUserToProject(projectId:Number,userID:Number,userRole:string):Observable<String>{
    console.log("role"+userRole);
    return this.http.post<any>(`http://localhost:8080/api/v1/users/users/${userID}/projects/${projectId}/${userRole}`,null);
    
  }
  updateProject(projectId:Number,project:ProjectDTO |null){
    return this.http.put<string>(`http://localhost:8080/api/project/projects/${projectId}`,
    project)
  }
  changeUserRole(userRole:string,projectID:Number,userID:Number){
    return this.http.put<Boolean>(`http://localhost:8080/api/v1/users/users/${userID}/projects/${projectID}/${userRole}`,null);
  }
  deleteUserFromProject(userID:Number,projectID:Number){
    return this.http.delete<Boolean>(`http://localhost:8080/api/v1/users/users/${userID}/projects/${projectID}`);

  }
  getProjectsTeams(){

  }
  getTeamRole(projectID: number, teamID: number): Observable<TeamRoleDTO> {
    return this.http.get<TeamRoleDTO>(`http://localhost:8080/api/project/${projectID}/team/${teamID}/roles`);
  }
  changeTeamRole(newRole:string,projectID:Number,teamID:number){
    return this.http.put<Boolean>(`http://localhost:8080/api/project/${projectID}/team/${teamID}/roles/${newRole}`,null);
  }
  addTeamToProject(projectId:Number,teamID:Number,role:string){
    return this.http.post<Boolean>(`http://localhost:8080/api/project/projects/${projectId}/teams/${teamID}/${role} `,null);



  }


  getPublicProjects():Observable<ProjectDTO[]>{
    return this.http.get<ProjectDTO[]>(`http://localhost:8080/api/project/public-projects`);
  }
  deleteProject(projectID:Number){
    const url=`http://localhost:8080/api/project/${projectID}`;
    return this.http.delete<boolean>(url);

  }
}
