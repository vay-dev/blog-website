import { useState, useEffect } from "react";
import { fetchNews } from "./client";
import type { NewsApiResponse } from "../interfaces/news-response.interface";
import { loading$, error$ } from "../store/store";

export function useFetchNews(
  query: string | null = "latest",
  pageSize: number = 20,
  type: "everything" | "headlines"
) {
  const [data, setData] = useState<NewsApiResponse | null>(null);

  useEffect(() => {
    if (!query || !query.trim()) return;

    loading$.next(true);
    error$.next(null);

    fetchNews({ query, pageSize, type })
      .then((res) => {
        if (res.status === "error") {
          // NewsAPI returned an error object, not articles
          error$.next(res.message || "Unknown API error");
          setData(null);
        } else {
          setData(res as NewsApiResponse);
        }
      })
      .catch((error) => {
        error$.next(error.message || "Error fetching news");
        setData(null);
      })
      .finally(() => loading$.next(false));
  }, [query, pageSize, type]);

  return { data };
}
