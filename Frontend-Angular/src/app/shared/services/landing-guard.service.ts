import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class LandingGuardService implements CanActivate {
  constructor(public router: Router, public sessionService: SessionService) {}
  canActivate(): boolean {
    if (this.sessionService.isLogged()) {
      this.router.navigate(['sound-list']);
      return false;
    }
    return true;
  }
}
