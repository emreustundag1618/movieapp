import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly signup_url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzr6JZscXg-MvNBQYGv9YI3MoaIQzp2do';
  readonly signin_url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzr6JZscXg-MvNBQYGv9YI3MoaIQzp2do';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.signup_url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.signin_url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
  }

  private handleError(error: HttpErrorResponse) {
    let errMessage: string = '';

    if (!navigator.onLine) {
      // Client side error
      errMessage = 'Network error. Please check your internet access';
    } else {
      switch (error.error.error.message) {
        case 'INVALID_PASSWORD':
          errMessage = 'Invalid Password';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errMessage = 'Username or password is wrong';
          break;
        case 'EMAIL_NOT_FOUND':
          errMessage = 'Email not found';
          break;
        case 'USER_DISABLED':
          errMessage = 'User banned or disabled';
          break;
        case 'EMAIL_EXISTS':
          errMessage = 'Email already in use';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errMessage = 'Password sign-in is disabled for this project';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errMessage =
            'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        default:
          errMessage = 'An unknown error occured';
          break;
      }
    }

    return throwError(errMessage);
  }
}
