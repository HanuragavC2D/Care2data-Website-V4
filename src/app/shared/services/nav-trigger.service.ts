import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavTriggerService {
  private trigger: string | null = null;

  constructor(router: Router) {
    router.events
      .pipe(filter((e): e is NavigationStart => e instanceof NavigationStart))
      .subscribe(e => { this.trigger = e.navigationTrigger ?? null; });
  }

  isPopstate(): boolean {
    return this.trigger === 'popstate';
  }
}
