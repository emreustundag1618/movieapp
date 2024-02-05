import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-create.component.html',
  styleUrl: './movie-create.component.scss',
  providers: [CategoryService, MovieService],
})
export class MovieCreateComponent implements OnInit {
  private categoryService: CategoryService = inject(CategoryService);
  private movieService: MovieService = inject(MovieService);
  categories!: Category[];

  error: any;

  model: any = {
    categoryId: ""
  };

  // other injections
  constructor(private router: Router, private alertify: AlertifyService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.error = err),
    });
  }

  createMovie() {
    let testId = 111;

    console.log(this.model);

    const movie = {
      id: testId,
      title: this.model.title,
      description: this.model.description,
      img: this.model.imageUrl,
      isPopular: false,
      createdAt: new Date(),
      categoryId: Number(this.model.categoryId),
    };

    console.log(movie);

    // // this throws an error because json server couldnt be configured to disable cors and allow origin policy
    // this.movieService.createMovie(movie).subscribe({
    //   next: (data) => {
    //     // If successful post then navigate to
    //     this.router.navigate(['/movies', data.id]);
    //     console.log(data);
    //   },
    //   error: (err) => console.error(err),
    // });
  }
  log(categoryId: NgModel) {
    console.log(categoryId)
  }
}
