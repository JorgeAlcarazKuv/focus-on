import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from '../../shared/shared.module';
import { EventAddDialogComponent } from './event-add-dialog/event-add-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [CalendarComponent, EventAddDialogComponent],
  entryComponents: [EventAddDialogComponent],
})
export class CalendarModule { }
