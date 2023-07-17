import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
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
@Injectable({
  providedIn: 'root'
})
export class TeaminfoService {

  constructor(private http: HttpClient,private router: Router) { }
  addTeam(teamName:string) : Observable<number>{
    const data:Team ={
      teamName: teamName
    } 
    const url='http://localhost:8080/api/teams/add_team'

  return this.http.post<number>(url,data);
  }
  teams: TeamDTO[] = [];

  getAllTeams(): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>('http://localhost:8080/api/teams/get_teams');
  }
  
      deleteTeam(teamName: string): Observable<Boolean> {
   
          return this.http.delete<boolean>('http://localhost:8080/api/teams/delete_team', {params:{teamname: teamName}});
      }

      updateTeam(newTeamName: string, teamName: string): void {
        const team = {
          teamName: newTeamName
        };
    
        this.http.put<boolean>('http://localhost:8080/api/teams/update_team?teamname=' + teamName, team)
          .subscribe(
            (response) => {
              console.log('Team updated successfully:', response);
              // Handle the response as needed
            },
            (error) => {
              console.error('Failed to update team:', error);
              // Handle the error as needed
            }
          );
      }
      addUserToTeam(teamId: string, userId: string): Observable<Boolean> {
        return this.http.post<boolean>(`http://localhost:8080/api/teams/${teamId}/users/${userId}`, null)
        
      }
      removeUserFromTeam(teamId: number, userId: number): Observable<Boolean> {
      return  this.http.delete<boolean>(`http://localhost:8080/api/teams/${teamId}/users/${userId}`)
        
      }

      getTeamUsers(teamId: number): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(`http://localhost:8080/api/teams/${teamId}/users`);
      }
   
          
    
}
