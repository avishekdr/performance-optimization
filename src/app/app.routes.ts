
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'debounce', pathMatch: 'full' },
  { path: 'debounce', loadComponent: () => import('./features/debounce-search/debounce-search.component').then(m => m.DebounceSearchComponent) },
  { path: 'throttle', loadComponent: () => import('./features/throttle-demo/throttle-demo.component').then(m => m.ThrottleDemoComponent) },
  { path: 'dynamic', loadComponent: () => import('./features/dynamic-import/dynamic-import.component').then(m => m.DynamicImportComponent) },
  { path: 'xss', loadComponent: () => import('./features/xss-safety/xss-safety.component').then(m => m.XssSafetyComponent) },
  { path: 'csrf', loadComponent: () => import('./features/csrf-demo/csrf-demo.component').then(m => m.CsrfDemoComponent) },
  { path: '**', redirectTo: 'debounce' }
];
