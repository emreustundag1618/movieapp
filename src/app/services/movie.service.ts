import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, tap, throwError } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable()
export class MovieService {
  readonly url = 'http://localhost:3000/movies'; // will be cancelled
  readonly firebase_url =
    'https://angular-movie-app-392ea-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) {}

  getMovies(categoryId?: number): Observable<Movie[]> {
    let newUrl = this.url;

    if (categoryId) {
      newUrl += '?categoryId=' + categoryId;
    }

    return this.http.get<Movie[]>(newUrl).pipe(
      // Used when you want to affect outside state with a notification
      // without altering the notification
      // tap((data) => console.log(data)), // for logging
      // If you plan to use one error message just throw it like this.
      //   catchError(error => {
      //     throw 'An error occured'
      //   })

      // But for advanced usage
      catchError(this.handleError)
    );
  }

  getMoviesFromFirebase(categoryId?: number): Observable<Movie[]> {
    let newUrl = this.firebase_url;

    return this.http.get<Movie[]>(newUrl + 'movies.json').pipe(
      // Used when you want to affect outside state with a notification
      // without altering the notification
      tap((data) => console.log(data)),
      map((data) => {
        const movieArray: Movie[] = [];

        for (const key in data) {
          if (categoryId) {
            if (categoryId == data[key].categoryId) {
              movieArray.push({ ...data[key], id: key });
            }
          } else {
            movieArray.push({ ...data[key], id: key });
          }
        }
        console.log(movieArray);
        return movieArray;
      }),
      // If you plan to use one error message just throw it like this.
      //   catchError(error => {
      //     throw 'An error occured'
      //   })

      // But for advanced usage
      catchError(this.handleError),
      delay(500)
    );
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this.http
      .get<Movie>(this.url + '/' + movieId)
      .pipe(catchError(this.handleError));
  }

  getMovieByIdFromFirebase(movieId: string): Observable<Movie> {
    return this.http
      .get<Movie>(this.firebase_url + 'movies/' + movieId + '.json')
      .pipe(catchError(this.handleError), delay(500));
  }

  private handleError(error: HttpErrorResponse) {
    let err: string = '';
    if (error.error instanceof ErrorEvent) {
      // client or network error
      err = 'Client or network error: ' + error.error.message;
    } else {
      // backend or api error
      switch (error.status) {
        case 404:
          err = '404 Not Found';
          break;
        case 403:
          err = '403 access denied';
          break;
        case 500:
          err = '500 Internal Server error';
          break;
        default:
          err = 'An unknown error occured';
      }
    }
    return throwError(err);
  }

  createMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http.post<Movie>(this.url, movie, httpOptions).pipe(
      // tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  createMovieToFirebase(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http
      .post<Movie>(this.firebase_url + 'movies.json', movie, httpOptions)
      .pipe(
        // tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }
}
