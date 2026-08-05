import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  private categorySubject = new BehaviorSubject<string>('Todos');
  readonly category$: Observable<string> = this.categorySubject.asObservable();

  selectCategory(category: string): void {
    this.categorySubject.next(category);
  }

  get selectedCategory(): string {
    return this.categorySubject.value;
  }
}
