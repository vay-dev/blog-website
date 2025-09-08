import HeaderComponent from "./components/ui/header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  debouncedSearchTerm$,
  error$,
  loading$,
  searchTermResults$,
  isSearchActive$,
} from "./store/store";
import { useFetchNews } from "./methods/useFetchNews";
import Loading from "./components/ui/loading";
import CusFooter from "./components/ui/footer";
import type { NewsApiResponse } from "./interfaces/news-response.interface";
import ErrorState from "./components/ui/error";
import SearchResultsPage from "./pages/searchResults";

function App() {
  const [isLoading, setIsLoading] = useState(loading$.value);
  const [error, setError] = useState(error$.value);
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");
  const [searchTermResults, setSearchTermResults] =
    useState<NewsApiResponse | null>(null);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  //  subscribe to loading state
  useEffect(() => {
    const subL = loading$.subscribe(setIsLoading);
    const subE = error$.subscribe(setError);
    const subSA = isSearchActive$.subscribe(setIsSearchActive);
    return () => {
      subL.unsubscribe();
      subE.unsubscribe();
      subSA.unsubscribe();
    };
  }, []);

  // subscription to debouncedSearchTerm$
  useEffect(() => {
    const sub = debouncedSearchTerm$.subscribe(setDebouncedTerm);
    return () => sub.unsubscribe();
  }, []);

  const data = useFetchNews(debouncedTerm, 100, "everything");

  useEffect(() => {
    // Only update search results if search is active and we have a search term
    if (isSearchActive && debouncedTerm && data && data.data) {
      searchTermResults$.next(data.data);
    } else if (!isSearchActive) {
      // Clear search results when search is not active
      searchTermResults$.next(null);
    }
  }, [debouncedTerm, data, isSearchActive]);

  // subscription to getting data state
  useEffect(() => {
    const sub = searchTermResults$.subscribe(setSearchTermResults);
    return () => sub.unsubscribe();
  }, []);

  return (
    <>
      <HeaderComponent />
      {isLoading && <Loading />}
      {error && (
        <ErrorState
          type="server"
          error={error}
          showDetails={true}
          onRetry={() => window.location.reload()}
        />
      )}
      {!error && !searchTermResults && (
        <main className="content-wrapper">
          <Outlet />
        </main>
      )}
      {searchTermResults && (
        <SearchResultsPage
          articles={searchTermResults.articles}
          results={debouncedTerm}
        />
      )}
      <CusFooter />
    </>
  );
}

export default App;
