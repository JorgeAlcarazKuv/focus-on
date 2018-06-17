import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SessionService } from './session.service';

@Injectable()
export class HttpWrapperService {
  private URL: string;

  private params: HttpParams;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    // TODO: Hacer archivo properties y servicio que lo cargue.
    this.URL = 'https://focusonrest.herokuapp.com';
  }

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    // If user is logged, add Authorization header.
    if (this.sessionService.isLogged()) {
      headers = headers.append(
        'Authorization',
        'Bearer ' + this.sessionService.getUser().token
      );
    }

    // headers = headers.append('Content-Type', 'application/json');

    return headers;
  }

  private createOptions(): any {
    const options = {
      headers: this.createHeaders(),
      observe: 'body',
      responseType: 'json'
    };
    return options;
  }
  /**
   * Registers the user.
   * @param username
   * @param password
   */
  public register(username: string, password: string): Observable<any> {
    const address = this.URL + '/user/register'; // TODO: Parametrizar endpoint
    // TODO: Modelar User y cambiar esto para enviar el DTO pasado a JSON.
    const body = {
      username: username,
      password: password
    };
    return this.http.post(address, body, this.createOptions()).pipe(
      map(res => {
        this.sessionService.setUser(res['token']);
        return res;
      })
    );
  }

  /**
   * Logs the User in.
   * @param username
   * @param password
   */
  public login(username: string, password: string): Observable<any> {
    const address = this.URL + '/user/login'; // TODO: Parametrizar endpoint
    // TODO: Modelar User y cambiar esto para enviar el DTO pasado a JSON.
    const body = {
      username: username,
      password: password
    };
    return this.http.post(address, body, this.createOptions()).pipe(
      map(res => {
        this.sessionService.setUser(res['token']);
        return res;
      })
    );
  }

  /**
   * Logs the User out.
   */
  public logout() {
    this.sessionService.unsetUser();
  }

  /**
   * Retrieves the list of files a User owns.
   */
  public getUserEditorFiles(): Observable<any> {
    const address = this.URL + '/files/list'; // TODO: Parametrizar endpoint
    // TODO: Modelar User y cambiar esto para enviar el DTO pasado a JSON.
    const body = {
      username: this.sessionService.getUser().username
    };

    return this.http.post(address, body, this.createOptions());
  }

  /**
   * Saves all the files the user owns in the db.
   */
  public saveUserFiles(fileList): Observable<any> {
    const address = this.URL + '/files/list'; // TODO: Parametrizar endpoint
    const body = fileList;

    return this.http.put(address, body, this.createOptions());
  }

  /**
   * Delete from database a given file.
   * @param file
   */
  public deleteUserFile(file): Observable<any> {
    const address = this.URL + '/files?fileId=' + file.id; // TODO: Parametrizar endpoint

    return this.http.delete(address, this.createOptions());
  }

  /**
   * Gets the user's event list
   */
  public getUserEvents() {
    const address = this.URL + '/calendar'; // TODO: Parametrizar endpoint
    // TODO: Modelar User y cambiar esto para enviar el DTO pasado a JSON.
    const body = {
      username: this.sessionService.getUser().username
    };
    return this.http.post(address, body, this.createOptions());
  }

  /**
   * Saves the user's event list
   */
  public saveUserEvents(events) {
    const address = this.URL + '/calendar'; // TODO: Parametrizar endpoint
    // TODO: Modelar User y cambiar esto para enviar el DTO pasado a JSON.
    const body = {
      events: JSON.stringify(events),
      username: this.sessionService.getUser().username
    };

    return this.http.put(address, body, this.createOptions());
  }
}
