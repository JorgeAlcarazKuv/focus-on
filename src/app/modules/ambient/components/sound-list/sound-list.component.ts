import { Component, OnInit } from '@angular/core';
import { SoundPlayerService } from '../../../../shared/services/sound-player.service';
import { MatDialog } from '@angular/material';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';

@Component({
  selector: 'app-sound-list',
  templateUrl: './sound-list.component.html',
  styleUrls: ['./sound-list.component.css']
})
export class SoundListComponent implements OnInit {

  constructor(
    public soundPlayerService: SoundPlayerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.soundPlayerService.checkInitialProfilePlayState();
  }

  openQRDialog(): void {
    const dialogRef = this.dialog.open(QrDialogComponent, {
      width: '400px',
      data: { username: this.soundPlayerService.userLogged.username }
    });
  }
}
