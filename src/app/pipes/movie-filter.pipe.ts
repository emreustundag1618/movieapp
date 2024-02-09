import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
  name: 'movieFilter',
  standalone: true,
})
export class MovieFilterPipe implements PipeTransform {
  transform(movies: Movie[], searchTerm: string): Movie[] {
    searchTerm = searchTerm.toLowerCase();

    const filteredMovies = searchTerm? movies.filter((movie: Movie) =>
        movie.title.toLowerCase().indexOf(searchTerm) !== -1
        || movie.description.toLowerCase().indexOf(searchTerm) !== -1) : movies;

    return filteredMovies
  }

}
