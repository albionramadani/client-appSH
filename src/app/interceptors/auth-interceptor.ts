
import { Observable, BehaviorSubject, Subject, throwError, catchError, switchMap, filter, take, tap, finalize, map, delay,pipe } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth-service';
import { MessageService } from '../services/messages-service';
import { AuthenticatedModel } from '../interfaces/auth-model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private readonly refreshedToken$ = new Subject<string | null>();

  constructor(private readonly authenticationService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly matDialog: MatDialog) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authenticationService.getToken();
    if (token) {
      request = this.addToken(request, token);
    }
    // Handle response
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        else {
          return throwError(() => error);
        }
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      // Cancel previous pending requests
      this.refreshedToken$.next(null);

      return this.authenticationService.refreshToken()
      .pipe(switchMap((result: AuthenticatedModel | null) => {
          this.refreshedToken$.next(result?.token ?? null);

          if (result?.token) {
            return next.handle(this.addToken(request, result.token));
          }
          else {
            // Retrieve this before logging out, to get the correct url according to the rights of the user
            const loginUrl = this.authenticationService.getLoginUrl(this.router.url);
            this.authenticationService.logout();
            this.matDialog.closeAll();
            this.router.navigateByUrl(loginUrl);
            this.messageService.openError('logged out pleas log in again');

            // Return error and go into catchError to redirect
            return throwError(() => new Error('No token received.'));
          }
        }),
        catchError(error => {
          const loginUrl = this.authenticationService.getLoginUrl();
          this.authenticationService.logout();
          // Navigate to login page if refresh failed
          this.router.navigateByUrl(loginUrl);

          // Cancel pending requests
          this.refreshedToken$.next(null);

          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        }));
    }
    else {
      // Let other requests wait on the refreshed token
      return this.refreshedToken$.pipe(
        take(1),
        switchMap(token => {
          if(token) {
            return next.handle(this.addToken(request, token));
          }

          return throwError(() => new Error('No token received.'));
        }));
    }
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
