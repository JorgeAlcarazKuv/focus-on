import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpWrapperService } from '../../../shared/services/http-wrapper.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  showRegisterErrorMessage: boolean;
  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpWrapperService
  ) {}

  ngOnInit() {
    this.showRegisterErrorMessage = false;
  }

  /**
   * Function fired on clicking the "Cancel" button.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Function fired on clicking the "Log in" button.
   * It will try to log in the user. If it fails, shows an error message.
   */
  onRegisterClick(): void {
    this.http.register(this.data.username, this.data.password1).subscribe(
      res => {
        this.dialogRef.close();
      },
      error => {
        this.showRegisterErrorMessage = true;
        this.resetRegisterForm();
      }
    );
  }

  /**
   * Resets user input
   */
  resetRegisterForm() {
    console.log(this.data);

    for (const input in this.data) {
      if (true) {
        this.data[input] = '';
      }
    }
  }
}
