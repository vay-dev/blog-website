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
      .then((res) => setData(res))
      .catch(() => error$.next("Error fetching news"))
      .finally(() => loading$.next(false));
  }, [query, pageSize]);

  return { data };
}
