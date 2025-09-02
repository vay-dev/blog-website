// Represents the source of a news article
export interface NewsSource {
  id: string | null;
  name: string;
}

// Represents a single news article
export interface NewsArticle {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO date string
  content: string | null;
}

// Represents the full API response
export interface NewsApiResponse {
  status: "ok" | "error"; // usually "ok" or "error"
  totalResults: number;
  articles: NewsArticle[];
}
