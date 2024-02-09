import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss',
  providers: [CategoryService],
})
export class CategoryCreateComponent {
  categoryForm!: FormGroup;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.categoryForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      subtitle: new FormControl('', Validators.required),
    });
  }

  createCategory(): void {
    const category: Category = {
      id: "111",
      title: this.categoryForm.value.title,
      subtitle: this.categoryForm.value.subtitle,
    };

    // this.categoryService
    //   .addCategory(category)
    //   .subscribe((data) => console.log(data));

    let enableFirebasePost: boolean = true;
    enableFirebasePost
      ? this.categoryService
          .addCategoryToFirebase(category)
          .subscribe((data) => console.log(data))
      : null;

    this.router.navigate(['/']);
  }

  refreshForm(): void {}
}
