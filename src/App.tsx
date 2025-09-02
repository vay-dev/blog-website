// import { useState } from "react";
import HeaderComponent from "./components/ui/header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { debouncedSearchTerm$, error$, loading$ } from "./store/store";
import { useFetchNews } from "./methods/useFetchNews";
import Loading from "./components/ui/loading";
import CusFooter from "./components/ui/footer";

function App() {
  const [isLoading, setIsLoading] = useState(loading$.value);
  const [error, setError] = useState(error$.value);
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");

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

  useEffect(() => {}, [debouncedTerm, data]);

  return (
    <>
      <HeaderComponent />
      {isLoading && <Loading />}
      <main className="content-wrapper">
        <Outlet />
      </main>
      <CusFooter />
    </>
  );
}

export default App;
