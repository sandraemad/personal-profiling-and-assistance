import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
   const ngxSpinnerService=inject(NgxSpinnerService);
  ngxSpinnerService.show(); // Show the spinner before the request is sent
  return next(req).pipe(
    finalize(() => {
      ngxSpinnerService.hide(); // Hide the spinner after the request is completed
    }))
};
