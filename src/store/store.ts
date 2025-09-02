import { BehaviorSubject, debounceTime, distinctUntilChanged } from "rxjs";
import type { NewsApiResponse } from "../interfaces/news-response.interface";

// search term stream
export const searchTerm$ = new BehaviorSubject<string>("");

// global loading state
export const loading$ = new BehaviorSubject<boolean>(false);

// global error state
export const error$ = new BehaviorSubject<string | null>(null);

export const debouncedSearchTerm$ = searchTerm$.pipe(
  debounceTime(600), // wait 600ms after the last change
  distinctUntilChanged() // only emit if the value changed
);

//  searchterm results
export const searchTermResults$ = new BehaviorSubject<NewsApiResponse | null>(
  null
);
