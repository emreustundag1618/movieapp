import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable()
export class MovieService {
  readonly url = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  getMovies(categoryId?: number): Observable<Movie[]> {
    let newUrl = this.url;

    if (categoryId) {
      newUrl += '?categoryId=' + categoryId;
    }

    return this.http.get<Movie[]>(newUrl).pipe(
      // Used when you want to affect outside state with a notification
      // without altering the notification
      tap((data) => console.log(data)),
      // If you plan to use one error message just throw it like this.
      //   catchError(error => {
      //     throw 'An error occured'
      //   })

      // But for advanced usage
      catchError(this.handleError)
    );
  }

  getMovieById(movieId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + '?id=' + movieId).pipe(
      catchError(this.handleError)
    );
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
        'Content-Type' : 'application/json',
        'Authorization': 'Token'
      })
    }
    return this.http.post<Movie>(this.url, movie, httpOptions).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    )
  }
}
