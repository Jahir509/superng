import { Injectable } from '@angular/core';
import { OrchestratorComponent } from '../orchestrator.component';
import { Route, Routes } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/**
 * Provides helper methods to create routes.
 */
export class Orchestrator {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: OrchestratorComponent,
      children: routes,
      // canActivate: [AuthenticationGuard],

      data: { reuse: true },
    };
  }
}

export enum NavMode {
  Locked,
  Free,
}


@Injectable({
  providedIn: 'root'
})
export class OrchestratorService {

  navicon = new BehaviorSubject<NavMode>(NavMode.Free);
  navModeSubject = new BehaviorSubject<NavMode>(NavMode.Free);
  navMode$ = this.navModeSubject.asObservable();
  navicon$ = this.navModeSubject.asObservable();

  constructor() { }
}
