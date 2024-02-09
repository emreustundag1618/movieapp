import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  providers: [MovieService],
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  isLoading: boolean = false;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.movieService.getMovieByIdFromFirebase(params['movieId']).subscribe((data) => {
        this.movie = data;
        this.isLoading = false;
      });
    });
  }
}
