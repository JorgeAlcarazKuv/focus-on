import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public selectExercise(exercise: string): void {
    this.router.navigate(['exercise', exercise]);
  }
}
