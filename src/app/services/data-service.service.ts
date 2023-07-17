/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProjectsDTO } from './userinfo.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly userInfoKey = 'userInfo';
  private readonly userEmailKey = 'userEmail';
  private readonly projectIDKey = 'projectID';
  private userInfo: UserProjectsDTO | null = null;
  private userEmail: string | null = null;
  private projectID: Number = 0;
  advancedMetricselected: { id: number, column: string, title: string, metric: string }[] = [];

  constructor(private http: HttpClient) {
    const storedUserInfo = localStorage.getItem(this.userInfoKey);
    if (storedUserInfo) {
      this.userInfo = JSON.parse(storedUserInfo);
    }

    const storedUserEmail = localStorage.getItem(this.userEmailKey);
    if (storedUserEmail) {
      this.userEmail = storedUserEmail;
    }

    const storedProjectID = localStorage.getItem(this.projectIDKey);
    if (storedProjectID) {
      this.projectID = parseInt(storedProjectID, 10); // Convert to number
    }
  }

  setUserInfo(userInfo: UserProjectsDTO) {
    this.userInfo = userInfo;
    localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
  }

  getUserInfo(): UserProjectsDTO | null {
    return this.userInfo;
  }

  setLoginEmail(email: string) {
    this.userEmail = email;
    localStorage.setItem(this.userEmailKey, email);
  }

  getLoginEmail(): string | null {
    return this.userEmail;
  }

  setProjectIDToModify(id: Number) {
    this.projectID = id;
    localStorage.setItem(this.projectIDKey, id.toString()); // Convert to string
  }

  getProjectIDToModify() {
    return this.projectID;
  }






}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProjectsDTO } from './userinfo.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly userInfoKey = 'userInfo';
  private readonly userEmailKey = 'userEmail';
  private readonly projectIDKey = 'projectID';
  private userInfo: UserProjectsDTO | null = null;
  private userEmail: string | null = null;
  private projectID: Number = 0;
  advancedMetricselected: { id: number, column: string, title: string, metric: string }[] = [];

  constructor(private http: HttpClient) {
    const storedUserInfo = localStorage.getItem(this.userInfoKey);
    if (storedUserInfo) {
      this.userInfo = JSON.parse(storedUserInfo);
    }

    const storedUserEmail = localStorage.getItem(this.userEmailKey);
    if (storedUserEmail) {
      this.userEmail = storedUserEmail;
    }

    const storedProjectID = localStorage.getItem(this.projectIDKey);
    if (storedProjectID) {
      this.projectID = parseInt(storedProjectID, 10); // Convert to number
    }
  }

  setUserInfo(userInfo: UserProjectsDTO) {
    this.userInfo = userInfo;
    localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
  }

  getUserInfo(): UserProjectsDTO | null {
    return this.userInfo;
  }

  setLoginEmail(email: string) {
    this.userEmail = email;
    localStorage.setItem(this.userEmailKey, email);
  }

  getLoginEmail(): string | null {
    return this.userEmail;
  }

  setProjectIDToModify(id: Number) {
    this.projectID = id;
    localStorage.setItem(this.projectIDKey, id.toString()); // Convert to string
  }

  getProjectIDToModify() {
    return this.projectID;
  }
}