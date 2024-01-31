import { Movie } from './movie';

export class MovieRepository {
  private movies: Movie[];

  constructor() {
    this.movies = [
      {
        id: 1,
        title: 'movie 1',
        description:
          '1 This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        img: 'https://images.pexels.com/photos/7513421/pexels-photo-7513421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isPopular: true,
      },
      {
        id: 2,
        title: 'movie 2',
        description:
          '2 This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        img: 'https://images.pexels.com/photos/12519524/pexels-photo-12519524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isPopular: false
      },
      {
        id: 3,
        title: 'movie 3',
        description:
          '3 This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        img: 'https://images.pexels.com/photos/1904837/pexels-photo-1904837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isPopular: true
      },
    ];
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  // we can strict null checks from typescript not to use undefined here
  getMovieById(id: number): Movie | undefined{
    return this.movies.find((movie) => movie.id === id);
  }

  getPopularMovies() {
    return this.movies.filter(movie => movie.isPopular)
  }
}
