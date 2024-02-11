import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        let errMessage = '';
        if (!navigator.onLine) {
          // Client side error
          errMessage = 'Network error. Please check your internet access';
        }
        if (response.error.error) {
            if(response.status === 401) {
                errMessage = "Unauthorized to see this content. Please login";
            }
        }
        return throwError(errMessage);
      })
    );
  }
}
