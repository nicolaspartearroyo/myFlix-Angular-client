// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  isLoading = false;

  /**
  * Required for login
 */
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,

  ) { }

  ngOnInit(): void {
  }
  /**
    * Form details to login
   */
  userLogin(): void {
    this.router.navigate(['movies']);
    this.isLoading = true;
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.isLoading = false;
      this.dialogRef.close();

      // Set username and password for local storage
      localStorage.setItem('username', this.userData.Username);
      localStorage.setItem('token', result.token);

      //Welcome message.
      this.snackBar.open(this.userData.Username, 'Welcome!', {
        duration: 3000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.isLoading = false;
      this.snackBar.open(result, 'OK', {
        duration: 3000
      });
    })
  }
}