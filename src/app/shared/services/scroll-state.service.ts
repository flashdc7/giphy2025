import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {

  trendingScrollstate= signal(0);
}
