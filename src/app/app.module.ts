import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';

import { HttpWrapperService } from './shared/services/http-wrapper.service';
import { SessionService } from './shared/services/session.service';
import { SharedModule } from './shared/shared.module';

import { AmbientModule } from './modules/ambient/ambient.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { EditorModule } from './modules/editor/editor.module';
import { ExercisesModule } from './modules/exercises/exercises.module';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { CalendarModule } from './modules/calendar/calendar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AmbientModule,
    NavbarModule,
    EditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    // Firebase Modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    ExercisesModule,
    CalendarModule
  ],
  providers: [HttpWrapperService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
