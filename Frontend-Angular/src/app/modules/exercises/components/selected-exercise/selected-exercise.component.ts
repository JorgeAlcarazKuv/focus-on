import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-selected-exercise',
  templateUrl: './selected-exercise.component.html',
  styleUrls: ['./selected-exercise.component.css']
})
export class SelectedExerciseComponent implements OnInit {
  public exerciseName: string;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.exerciseName = params['exercise'];
    });
  }

  back() {
    this.location.back();
  }
}
