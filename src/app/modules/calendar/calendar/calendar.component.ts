import { Component, OnInit } from '@angular/core';
import { CalendarServiceService } from '../services/calendar-service.service';
import { MatDialog } from '@angular/material';
import { EventAddDialogComponent } from '../event-add-dialog/event-add-dialog.component';
import { SessionService } from '../../../shared/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public events: any;
  public header: any;

  constructor(
    private calendarService: CalendarServiceService,
    public dialog: MatDialog,
    public sessionService: SessionService,
    public router: Router
  ) {}

  ngOnInit() {
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    this.calendarService.getEvents().subscribe(res => {
      if (res) {
        this.events = res;
      } else {
        this.events = [];
      }
    });

    this.userStateSubscription();
  }

  public userStateSubscription() {
    // Subscription to User info changes. It will update the userLogged instance with every change.
    this.sessionService.userStateEmitter.subscribe(newUserState => {
      // If new state is null
      if (!newUserState) {
        // Redirects the user
        this.router.navigate(['sound-list']);
      }
    });
  }

  openLoginDialog(day?: string): void {
    const dialogRef = this.dialog.open(EventAddDialogComponent, {
      width: '400px',
      data: { title: '', start: day || '', end: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.events.push(result);
        this.saveEvents();
      }
    });
  }

  public handleEventClick(e) {
    this.events = this.events.filter(event => {
      return (
        event.title !== e.calEvent.title &&
        event.start !== e.calEvent.start &&
        event.end !== e.calEvent.end
      );
    });
    this.saveEvents();
  }
  public handleDayClick(e) {
    const date = new Date(e.date);
    this.openLoginDialog(date.toISOString().split('T')[0]);
  }

  public handleDrop(e) {
    this.saveEvents();
  }

  public saveEvents() {
    this.calendarService
      .saveEvents(this.events)
      .subscribe(res => console.log(res));
  }
}
