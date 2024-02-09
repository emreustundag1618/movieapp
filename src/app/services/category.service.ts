import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CategoryService {
  readonly url = 'http://localhost:3000/categories';

  readonly firebase_url =
    'https://angular-movie-app-392ea-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getCategoriesFromFirebase(): Observable<Category[]> {
    return this.http.get<Category[]>(this.firebase_url + 'categories.json').pipe(
      map(data => {
        const categoryArray: Category[] = [];

        for (const key in data) {
          categoryArray.push({...data[key], id: key})
        }

        return categoryArray;
      })
    );
  }

  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token',
    }),
  };

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url, category, this.httpPostOptions);
  }

  addCategoryToFirebase(category: Category): Observable<Category> {
    return this.http.post<Category>(
      this.firebase_url + 'categories.json',
      category,
      this.httpPostOptions
    );
  }
}
