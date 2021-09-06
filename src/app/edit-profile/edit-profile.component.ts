import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isLoading = false;

  @Input() userDetails = {
    Username: '',
    Password: '',
    Email: '',
    Birthdate: '',
  };

  constructor(
    
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { }

  updateUser(): void {
    this.isLoading = true;
    this.fetchApiData.editUserProfile(this.userDetails).subscribe((res) => {
      this.isLoading = false;
      this.dialogRef.close();
      localStorage.setItem('username', res.Username)
      this.snackBar.open(this.userDetails.Username, 'Successfully updated!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      setTimeout(function () {
        window.location.reload();
      }, 3500);
    })
  }
}