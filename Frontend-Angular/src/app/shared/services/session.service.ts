import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class SessionService {
  private user: User;
  public userStateEmitter: EventEmitter<User>;

  constructor() {
    this.userStateEmitter = new EventEmitter<User>();
    if ('token' in sessionStorage && 'username' in sessionStorage) {
      this.user = new User({
        token: sessionStorage.getItem('token'),
        username: sessionStorage.getItem('username')
      });
    }
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(token: string): void {
    // Token decoding
    const bodyJwtEncoded = token.split('.')[1];
    const bodyJwtJson = atob(bodyJwtEncoded);
    const bodyJwtObj = JSON.parse(bodyJwtJson);
    this.user = new User({ username: bodyJwtObj.username, token: token });

    // Sets user data in the browser's storage
    sessionStorage.setItem('username', bodyJwtObj.username);
    sessionStorage.setItem('token', token);

    // Emits a change of state.
    this.userStateEmitter.emit(this.user);
  }

  public isLogged(): boolean {
    return this.user ? true : false;
  }

  public unsetUser(): void {
    // Sets User info to null, and removes sessionStorage data.
    this.user = null;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

    // Emits a change of state.
    this.userStateEmitter.emit(this.user);
  }
}
