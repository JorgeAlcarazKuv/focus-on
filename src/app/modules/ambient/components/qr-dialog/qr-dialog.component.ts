import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.css']
})
export class QrDialogComponent implements OnInit {
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;

  constructor(
    public dialogRef: MatDialogRef<QrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.value = btoa(this.data.username + '.focuson');
  }

  /**
   * Function fired on clicking the "Cancel" button.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
