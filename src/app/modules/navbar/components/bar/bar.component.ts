import { Component, OnInit, Inject } from '@angular/core';
import { HttpWrapperService } from '../../../../shared/services/http-wrapper.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SessionService } from '../../../../shared/services/session.service';
import { User } from '../../../../shared/models/user.model';
import { RegisterDialogComponent } from '../../register-dialog/register-dialog.component';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  public userLogged: User;

  constructor(
    private httpWrapper: HttpWrapperService,
    private sessionService: SessionService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Initialization of User info. It can be either an User object or NULL whether it is logged.
    this.userLogged = this.sessionService.getUser();

    // Subscription to User info changes. It will update the userLogged instance with every change.
    this.sessionService.userStateEmitter.subscribe(newUserState => {
      this.userLogged = newUserState;
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '400px',
      data: { username: '', password1: '', password2: '' }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialogo cerrado, usuario introducido: ' + result);
    // });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      data: { username: '', password: '' }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialogo cerrado, usuario introducido: ' + result);
    // });
  }

  logout() {
    this.httpWrapper.logout();
  }
}
