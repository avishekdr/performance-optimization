import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, Subscription, throttleTime } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-throttle-demo',
  imports: [CommonModule],
  template: `
    <h2>Throttle Demo</h2>
    <p>Scroll the page or rapidly click the button; events are processed at most once every 500ms.</p>
    <button (click)="onClick()">Click me fast</button>
    <div class="log">
      <div *ngFor="let l of logs">{{ l }}</div>
    </div>
    <div style="height:1000px; background:linear-gradient(#eee,#ddd)">Scroll Area</div>
  `,
  styles: [`.log { margin-top:1rem; font-family:monospace; }`]
})
export class ThrottleDemoComponent implements OnDestroy {
  logs: string[] = [];
  private sub?: Subscription;

  constructor() {
    // Throttle scroll events
    this.sub = fromEvent(window, 'scroll')
      .pipe(throttleTime(500, undefined, { trailing: true }))
      .subscribe(() => {
        this.logs.unshift(`scroll @ ${new Date().toLocaleTimeString()}`);
        this.trimLog();
      });
  }

  onClick() {
    // Throttle per-click: emulate with a simple guard
    const now = Date.now();
    if (!this._lastClick || now - this._lastClick > 500) {
      this._lastClick = now;
      this.logs.unshift(`click @ ${new Date().toLocaleTimeString()}`);
      this.trimLog();
    }
  }
  private _lastClick = 0;

  private trimLog() {
    if (this.logs.length > 20) this.logs.pop();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
