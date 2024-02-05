import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { FormsModule } from '@angular/forms';
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

  categoryId: string = '';

  error: any;

  
  isRequired: boolean = false;

  // other injections
  constructor(private router: Router, private alertify: AlertifyService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.error = err),
    });
  }

  createMovie(
    title: HTMLInputElement,
    description: HTMLTextAreaElement,
    imageUrl: HTMLInputElement,
    categoryId: string
  ) {
    let testId = 111;

    // for basic validation, this logic normally is more complex
    if (title.value === "" || description.value === "") {
      this.isRequired = true;
      this.alertify.error("Title and description required");
      return
    }

    if (description.value.length > 50 || description.value.length < 10) {
      this.alertify.error('Description characters must be 10-50');
      return
    }

    const extensions = ['jpg', 'jpeg', 'png'];
    const extension: string | undefined = imageUrl.value.split('.').pop();
    
    if (extension && extensions.indexOf(extension) === -1) {
      this.alertify.error('Only jpg, jpeg, png allowed');
      return
    }
    

    const movie = {
      id: testId,
      title: title.value,
      description: description.value,
      img: imageUrl.value,
      isPopular: false,
      createdAt: new Date(),
      categoryId: Number(categoryId),
    };

    // this throws an error because json server couldnt be configured to disable cors and allow origin policy
    this.movieService.createMovie(movie).subscribe({
      next: (data) => {
        // If successful post then navigate to
        this.router.navigate(['/movies', data.id]);
        console.log(data);
      },
      error: (err) => console.error(err),
    });
  }
}
