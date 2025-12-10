
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }

  // Fake search: return filtered list with an artificial delay
  search(term: string) {
    const data = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa'];
    const filtered = data.filter(d => d.includes((term || '').toLowerCase()));
    return of(filtered).pipe(delay(400));
  }

  // Mutating request to show XSRF header attachment (will fail without backend, but logs are visible)
  createItem(payload: any) {
    // Replace with your backend path if available (e.g., /api/items)
    return this.http.post('http://localhost:8090/api/items', payload).pipe(
      // simulate (when proxied to a backend); here just pass through
      switchMap(() => of({ ok: true }).pipe(delay(300)))
    );
  }
}
