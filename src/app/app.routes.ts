import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { CategoryComponent } from './category/category.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

export const routes: Routes = [
    {
        path: '',
        // if we don't have a seperate homepage
        redirectTo: 'movies', 
        pathMatch: 'full'
    },
    {
        path: 'movies', 
        component: MoviesComponent,
        title: 'Movies'
    },
    {
        path: 'movies/create',
        component: MovieCreateComponent,
        title: 'Create a new movie'
    },
    {
        path: 'movies/:movieId', 
        component: MovieDetailsComponent,
        title: 'Movie Details'
    },
    {
        path: 'movies/category/:categoryId',
        component: MoviesComponent,
        title: 'Movies with Category ID'
    },
    {
        path: 'categories',
        component: CategoryComponent,
        title: 'Categories for testing'
    },
    {
        path: 'categories/create',
        component: CategoryCreateComponent,
        title: 'Category create'
    }
    
];
