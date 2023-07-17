import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GrafanaService {
 /* private baseUrl = 'http://localhost:3000';
  private authToken = 'eyJrIjoibWw2Q1E0eEpMNElibnJMNnJEdHd3UGc5ZUdxYVFJTUwiLCJuIjoiYXBpZXhwb3J0IiwiaWQiOjF9'; // Replace with your auth token

  constructor(private http: HttpClient) { }

  getPanel(uid: string, panelId: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.authToken}` };

    const url = `${this.baseUrl}/api/dashboards/uid/${uid}/panels/${panelId}`; 
    return this.http.get(url, { headers }).pipe(
      map((response: any) => {
        console.log("Got panel:", response);

        return response;
      })
    );
  }*/



  /*  private apiUrl = 'https://localhost:3000/api/dashboards/db/<dashboard-slug>';
    private apiKey = 'eyJrIjoiTE5kRmZTTVNsczIzNUd6bk9oaTQ5cXh0ZUtpYlZDZlciLCJuIjoiYXBpYW5ndWxhciIsImlkIjoxfQ==';
  
    constructor(private http: HttpClient) { }
  
    getDashboardData() {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.apiKey}` });
      return this.http.get(this.apiUrl, { headers });
    }*/
 }

