import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, Observable, throwError } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private spinner = inject(NgxSpinnerService)
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(request).pipe(
      finalize(() => this.spinner.hide()),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }
}

