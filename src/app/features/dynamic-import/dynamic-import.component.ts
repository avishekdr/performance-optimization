import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dynamic-import',
  imports: [CommonModule],
  template: `
    <h2>Dynamic Import</h2>
    <p>Click to dynamically load a heavy utility only when needed.</p>
    <button (click)="run()">Load & Compute</button>
    <pre *ngIf="result !== null">Result: {{ result }}</pre>
  `
})
export class DynamicImportComponent {
  result: number | null = null;

  async run() {
    const { heavyCalc } = await import('../../shared/utils/heavy-calc');
    this.result = heavyCalc(50_000);
  }
}
