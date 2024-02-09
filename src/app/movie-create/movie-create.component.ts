import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
    categoryId: '',
  };

  movieForm!: FormGroup;

  // other injections
  constructor(private router: Router, private alertify: AlertifyService) {
    this.movieForm = new FormGroup({
      title: new FormControl('Movie name...', [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl('Description...', [
        Validators.required,
        Validators.minLength(10),
      ]),
      imageUrl: new FormControl('Image Url...', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.error = err),
    });
  }

  createMovie() {
    let testId = "111";

    const movie = {
      id: testId,
      title: this.movieForm.value.title,
      description: this.movieForm.value.description,
      img: this.movieForm.value.imageUrl,
      isPopular: false,
      createdAt: new Date(),
      categoryId: Number(this.movieForm.value.categoryId),
    };

    console.log(this.movieForm);

    // // this throws an error because json server couldnt be configured to disable cors and allow origin policy

    if (this.movieForm.valid) {
      this.movieService.createMovieToFirebase(movie).subscribe({
        next: (data) => {
          // If successful post then navigate to
          this.router.navigate(['/movies']);
        },
        error: (err) => console.error(err),
      });
    } else {
      console.error('Form is not valid')
    }
  }

  log(categoryId: NgModel) {
    console.log(categoryId);
  }

  refreshForm() {
    this.movieForm.patchValue({
      title: '',
      description: '',
      imageUrl: '',
      categoryId: '',
    });
  }
}
