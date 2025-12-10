import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api.service';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-debounce-search',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Debounce Search</h2>
    <p>Type to search. API is called after you stop typing for 400ms.</p>
    <input [formControl]="searchControl" placeholder="Search (alpha, beta, ...)" />
    <div class="results">
      <div *ngFor="let item of results">{{ item }}</div>
    </div>
  `,
  styles: [`
    input { padding:.5rem; width: 320px; }
    .results { margin-top:1rem; }
  `]
})
export class DebounceSearchComponent {
  searchControl = new FormControl<string>('', { nonNullable: true });
  results: string[] = [];

  constructor(private api: ApiService) {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.api.search(term))
    ).subscribe(items => this.results = items);
  }
}
