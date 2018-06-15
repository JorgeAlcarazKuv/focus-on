import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../../shared/services/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarServiceService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  public getEvents() {
    return this.httpWrapperService.getUserEvents();
  }
  public saveEvents(events) {
    return this.httpWrapperService.saveUserEvents(events);
  }
}
