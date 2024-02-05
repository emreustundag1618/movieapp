import { Movie } from './movie';

export class MovieRepository {
  private movies: Movie[];

  constructor() {
    this.movies = [
      {
        id: 1,
        title: 'movie 1',
        description:
          '1 This is a wider cardd with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        img: '../../assets/1.jpeg',
        isPopular: true,
        createdAt: new Date(2023, 10, 10),
        categoryId: 1
      },
      {
        id: 2,
        title: 'movie 2',
        description:
          '2 This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        img: 'https://images.pexels.com/photos/12519524/pexels-photo-12519524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isPopular: false,
        createdAt: new Date(2024, 0, 18),
        categoryId: 1
      },
      {
        id: 3,
        title: 'movie 3',
        description:
          '3 This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        img: 'https://images.pexels.com/photos/1904837/pexels-photo-1904837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isPopular: true,
        createdAt: new Date(1990, 10, 10),
        categoryId: 2
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
