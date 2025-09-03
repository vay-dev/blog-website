// import { useState } from "react";
import HeaderComponent from "./components/ui/header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  debouncedSearchTerm$,
  error$,
  loading$,
  searchTermResults$,
} from "./store/store";
import { useFetchNews } from "./methods/useFetchNews";
import Loading from "./components/ui/loading";
import CusFooter from "./components/ui/footer";
import type { NewsApiResponse } from "./interfaces/news-response.interface";
import ErrorState from "./components/ui/error";

function App() {
  const [isLoading, setIsLoading] = useState(loading$.value);
  const [error, setError] = useState(error$.value);
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");
  const [searchTermResults, setSearchTermResults] =
    useState<NewsApiResponse | null>(null);

  //  subscribe to loading state
  useEffect(() => {
    const subL = loading$.subscribe(setIsLoading);
    const subE = error$.subscribe(setError);
    return () => {
      subL.unsubscribe();
      subE.unsubscribe();
    };
  }, []);

  // subscription to debouncedSearchTerm$
  useEffect(() => {
    const sub = debouncedSearchTerm$.subscribe(setDebouncedTerm);
    return () => sub.unsubscribe();
  }, []);

  const data = useFetchNews(debouncedTerm, 100, "everything");

  useEffect(() => {
    if (data && data.data) {
      searchTermResults$.next(data.data);
    } else {
      searchTermResults$.next(null);
    }
  }, [debouncedTerm, data]);

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
      {!error && (
        <main className="content-wrapper">
          <Outlet />
        </main>
      )}
      <CusFooter />
    </>
  );
}

export default App;
