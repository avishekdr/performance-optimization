import { Component, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    <div>
      XSS bypassed by making URL trusted using sanitization:<br>
      <iframe width="560" height="315" [src]="trustedUrl" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div>
      XSS blocked by Angular for untrusted URL (no sanitization):<br>
      <iframe width="560" height="315" [src]="URL" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  `
})
export class XssSafetyComponent {
  maliciousHtml = `<img src=x onerror=alert('XSS')> Hello`;
  sanitizedHtml: string | null;
  trustedHtml;
  URL: string = 'https://www.youtube.com/embed/0eWrpsCLMJQ?si=BEAMUbZSxn3RTdyg';
  trustedUrl: SafeUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {
    // Programmatic sanitization (HTML)
    this.sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.maliciousHtml);

    // ⚠ Only bypass when you absolutely trust the source.
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml('<strong>Trusted Content</strong>');
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.URL);
  }
}
