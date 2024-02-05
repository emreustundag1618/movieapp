import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { SummaryPipe } from '../../pipes/summary.pipe';
import { ReadableTimePipe } from '../../pipes/readable-time.pipe';
import { MoviesComponent } from '../movies.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterModule, SummaryPipe, ReadableTimePipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input() movie!: Movie;
  @Input() selectedMovie!: Movie | null;

  // TODO: Event emitter will be made from parent comp into the child soon after

  moviesComponent!: MoviesComponent;

  ngAfterViewInit(): void {
    // Now that the view has been initialized, the ViewChild reference is available
    this.callAddToList(new Event('click'), this.movie);
  }

  callAddToList($event: any, movie: Movie): void {
    // Ensure moviesComponent is defined before calling addToList
    if (this.moviesComponent) {
      this.moviesComponent.addToList($event, movie);
    }
  }
}
