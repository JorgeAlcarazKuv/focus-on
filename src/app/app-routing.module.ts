import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoundListComponent } from './modules/ambient/components/sound-list/sound-list.component';
import { EditorComponent } from './modules/editor/components/editor/editor.component';
import { PanelComponent } from './modules/exercises/components/panel/panel.component';
import { SelectedExerciseComponent } from './modules/exercises/components/selected-exercise/selected-exercise.component';
import { LandingSelectorComponent } from './modules/ambient/components/landing-selector/landing-selector.component';
import { CalendarComponent } from './modules/calendar/calendar/calendar.component';
import { LandingGuardService } from './shared/services/landing-guard.service';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingSelectorComponent,
    canActivate: [LandingGuardService]
  },
  { path: 'editor', component: EditorComponent },
  { path: 'sound-list', component: SoundListComponent },
  { path: 'exercise-list', component: PanelComponent },
  { path: 'exercise/:exercise', component: SelectedExerciseComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
