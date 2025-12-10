import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="nav">
      <a routerLink="/debounce">Debounce</a>
      <a routerLink="/throttle">Throttle</a>
      <a routerLink="/dynamic">Dynamic Import</a>
      <a routerLink="/xss">XSS Safety</a>
      <a routerLink="/csrf">CSRF Demo</a>
    </nav>
    <main class="container">
      <router-outlet/>
    </main>
  `,
  styles: [`
    .nav { display:flex; gap:1rem; padding:1rem; background:#222; }
    .nav a { color:#fff; text-decoration:none; }
    .container { padding:1rem; }
  `]
})
export class AppComponent {
  title = 'performance-optimization';
}
