import { Component, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-xss-safety',
  imports: [CommonModule],
  template: `
    <h2>XSS Safety</h2>

    <h3>Angular auto-sanitizes dangerous HTML in bindings like [innerHTML]</h3>
    <p>Below malicious HTML will have dangerous attributes stripped:</p>
    <div [innerHTML]="maliciousHtml"></div>

    <h3>Sanitize programmatically</h3>
    <pre>Sanitized: {{ sanitizedHtml }}</pre>

    <h3>Only bypass for truly trusted content</h3>
    <div [innerHTML]="trustedHtml"></div>
    <a [href]="trustedUrl">Trusted URL</a>
  `
})
export class XssSafetyComponent {
  maliciousHtml = `x<script>alert('XSS')</script>`;
  sanitizedHtml: string | null;
  trustedHtml;
  trustedUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Programmatic sanitization (HTML)
    this.sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.maliciousHtml);

    // ⚠ Only bypass when you absolutely trust the source.
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml('<strong>Trusted Content</strong>');
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl('mailto:support@example.com');
  }
}
