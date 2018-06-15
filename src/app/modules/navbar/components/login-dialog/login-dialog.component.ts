import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpWrapperService } from '../../../../shared/services/http-wrapper.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  public showLoginErrorMessage: boolean;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpWrapperService
  ) {}

  ngOnInit() {
    this.showLoginErrorMessage = false;
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
  onLoginClick(): void {
    this.http.login(this.data.username, this.data.password).subscribe(
      res => {
        this.dialogRef.close();
      },
      error => {
        this.showLoginErrorMessage = true;
        this.resetLoginForm();
      }
    );
  }

  /**
   * Resets user input
   */
  resetLoginForm() {
    console.log(this.data);

    for (const input in this.data) {
      if (true) {
        this.data[input] = '';
      }
    }
  }
}
