import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private appService: AppService) {}

  intercept(req, next) {
    this.appService.showLoading();
    return next.handle(req).pipe(finalize(() => this.appService.hideLoading()));
  }
}
