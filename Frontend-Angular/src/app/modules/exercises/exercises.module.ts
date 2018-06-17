import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { SelectedExerciseComponent } from './components/selected-exercise/selected-exercise.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [PanelComponent, SelectedExerciseComponent],
  exports: []
})
export class ExercisesModule {}
