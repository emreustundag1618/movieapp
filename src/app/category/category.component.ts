import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category';
import { CategoryRepository } from '../models/category.repository';
import { CategoryService } from '../services/category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  // this is an another method for no-initialized property
  categories!: Category[];
  categoryRepository!: CategoryRepository;
  selectedCategory: Category | null = null;

  displayAll: boolean = true;

  constructor(private categoryService: CategoryService) {
    // this.categoryRepository = new CategoryRepository();
    // this.categories = this.categoryRepository.getCategories();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
    })
  }

  selectCategory($event: any, category?: Category) {
    if (category) {
      this.selectedCategory = category;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
}
