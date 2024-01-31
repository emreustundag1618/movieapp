import { Component } from '@angular/core';
import { MovieComponent } from './movie/movie.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieComponent, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  title = 'Movies';
  movies: Movie[];
  movieRepository: MovieRepository;
  // popularMovies: Movie[];
  
  constructor() {
    this.movieRepository = new MovieRepository();
    this.movies = this.movieRepository.getMovies();
    // this.popularMovies = this.movieRepository.getPopularMovies();
  }
}
