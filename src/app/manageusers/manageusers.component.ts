import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  // Add more role values if needed
}

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent {
  status = true;
  firstname: string="";
  lastname: string="";
  email: string="";
  password: string="";
  passwordverif: string="";
  role!: Role;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  goAdminsitration() {
    this.router.navigate(['/administration']);
  }

  addToggle() {
    this.status = !this.status;
  }

  handleClose() {
    console.log('Popup closed');
  }

  onRoleSelected(selectedValue: Role) {
    console.log('Selected Role:', selectedValue);
    this.role = selectedValue;
  }

  registerUser() {
    console.log("this.role"+this.role)
    console.log("pwd"+this.password);
    console.log("pwd"+this.firstname);
    console.log("pwd"+this.lastname);
    console.log("pwd"+this.email);
    const request: RegisterRequest = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: this.role
    };
 


    const url = 'http://localhost:8080/api/v1/auth/register';
    this.http.post<any>(url, request).subscribe(
      response => {
        // Registration success
        console.log('Registration successful', response);
        // Handle the authentication response as needed
        this.goUsers();
      },
      error => {
        // Registration failed
        console.error('Registration failed', error);
        // Handle the error response as needed
      }
    );
  }
  goUsers(){
    this.router.navigate(['/users']);

  }
}
