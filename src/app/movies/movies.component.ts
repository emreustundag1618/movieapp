import { Component, OnInit, inject } from '@angular/core';
import { MovieComponent } from './movie/movie.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';
import { SummaryPipe } from '../pipes/summary.pipe';
import { FormsModule } from '@angular/forms';
import { MovieFilterPipe } from '../pipes/movie-filter.pipe';
import { AlertifyService } from '../services/alertify.service';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MovieComponent,
    CommonModule,
    SummaryPipe,
    FormsModule,
    MovieFilterPipe,
    RouterModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  // for local services
  providers: [MovieService],
})
export class MoviesComponent implements OnInit {
  title = 'Movies';
  movies: Movie[] = [];
  movieRepository!: MovieRepository;
  popularMovies: Movie[];
  filteredMovies: Movie[] = [];
  selectedMovie: Movie | null = null;

  movieService: MovieService = inject(MovieService);
  selectedCategoryId: number = 0;

  searchTerm: string = '';

  // For error handling
  error: any;

  isLoading: boolean = false;

  constructor(
    private alertify: AlertifyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.movieRepository = new MovieRepository();
    // this one before was retrieved from movieRepository which has the data in local
    // this.movies = this.movieRepository.getMovies();

    this.popularMovies = this.movieRepository.getPopularMovies();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.selectedCategoryId = params['categoryId'];
      this.movieService.getMovies(this.selectedCategoryId).subscribe({
        next: (data) => {
          // this.movies = data;
          // this.filteredMovies = data;
          // console.log(this.movies)
        },
        error: (error) => {
          this.error = error;
        },
        // complete: () => console.log('done'),
      });

      let enableFirebase: boolean = true;
      this.isLoading = true;
      enableFirebase
        ? this.movieService
            .getMoviesFromFirebase(this.selectedCategoryId)
            .subscribe((data) => {
              this.movies = data;
              this.filteredMovies = data;
              this.isLoading = false;
            }, error => {
              this.error = error;
              this.isLoading = false;
            })
        : null;
    });
  }

  onInputChange() {
    this.filteredMovies = this.searchTerm
      ? this.filteredMovies.filter(
          (movie) =>
            movie.title.indexOf(this.searchTerm) !== -1 ||
            movie.description.indexOf(this.searchTerm) !== -1
        )
      : this.movies;
  }

  addToList($event: any, movie: Movie) {
    this.selectedMovie = movie;

    if ($event.target.classList.contains('btn-dark')) {
      $event.target.innerText = '- Remove from list';
      $event.target.classList.remove('btn-dark');
      $event.target.classList.add('btn-warning');

      this.alertify.success(movie.title + ' added to the list');
    } else {
      $event.target.innerText = '+ Add to list';
      $event.target.classList.remove('btn-warning');
      $event.target.classList.add('btn-dark');

      this.alertify.warning(movie.title + ' removed from the list');
    }
  }
}
