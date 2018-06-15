import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpWrapperService } from '../../../shared/services/http-wrapper.service';

@Component({
  selector: 'app-event-add-dialog',
  templateUrl: './event-add-dialog.component.html',
  styleUrls: ['./event-add-dialog.component.css']
})
export class EventAddDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpWrapperService
  ) {}

  ngOnInit() {}

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
  onAddClick(): void {
    this.dialogRef.close(this.data);
    // this.http.login(this.data.username, this.data.password).subscribe(
    //   res => {
    //     this.dialogRef.close();
    //   },
    //   error => {
    //   }
    // );
  }
}
