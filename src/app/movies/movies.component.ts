import { Component } from '@angular/core';
import { MovieComponent } from './movie/movie.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';
import { SummaryPipe } from '../pipes/summary.pipe';
import { FormsModule } from '@angular/forms';
import { MovieFilterPipe } from '../pipes/movie-filter.pipe';
import { AlertifyService } from '../services/alertify.service';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MovieComponent,
    CommonModule,
    SummaryPipe,
    FormsModule,
    MovieFilterPipe
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  title = 'Movies';
  movies: Movie[];
  movieRepository: MovieRepository;
  // popularMovies: Movie[];
  filteredMovies: Movie[];
  selectedMovie: Movie | null = null;

  searchTerm: string = '';

  constructor(private alertify: AlertifyService) {
    this.movieRepository = new MovieRepository();
    this.movies = this.movieRepository.getMovies();
    this.filteredMovies = this.movies;
    
    // this.popularMovies = this.movieRepository.getPopularMovies();
  }

  onInputChange() {
    this.filteredMovies = this.searchTerm?
      this.filteredMovies.filter(movie => movie.title.indexOf(this.searchTerm) !== -1
      || movie.description.indexOf(this.searchTerm) !== -1) : this.movies;
  }

  addToList($event: any, movie: Movie) {
    this.selectedMovie = movie;

    if($event.target.classList.contains('btn-dark')) {
      $event.target.innerText = "- Remove from list"
      $event.target.classList.remove('btn-dark');
      $event.target.classList.add('btn-warning');

      this.alertify.success(movie.title + " added to the list");
    } else {
      $event.target.innerText = "+ Add to list"
      $event.target.classList.remove('btn-warning');
      $event.target.classList.add('btn-dark');

      this.alertify.warning(movie.title + " removed from the list");
    }
  }
}
