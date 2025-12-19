import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api.service';

@Component({
  standalone: true,
  selector: 'app-csrf-demo',
  imports: [CommonModule],
  template: `
    <h2>CSRF Demo</h2>
    <p>
      Angular's HttpClientXsrfModule looks for the <code>XSRF-TOKEN</code> cookie and
      sends it as <code>X-XSRF-TOKEN</code> header for mutating requests.
    </p>
    <button (click)="send()">Send POST (observe console for XSRF header)</button>
    <div class="note">
      <strong>Note:</strong> You need a backend that sets the <code>XSRF-TOKEN</code> cookie
      (not HttpOnly), e.g., on GET <code>/api/csrf</code>, and validates <code>X-XSRF-TOKEN</code>.
    </div>
    <div [innerHTML]="csrfMsg"></div>
  `,
  styles: [`.note { margin-top:1rem; }`]
})
export class CsrfDemoComponent {
  constructor(private api: ApiService) { }
  csrfMsg = '';

  send() {
    this.api.createItem({ name: 'example' }).subscribe({
      next: (res) => this.csrfMsg = `POST successful: ${JSON.stringify(res)}`,
      error: (err) => this.csrfMsg = JSON.stringify(err)
    });
  }
}
