export function getCurrentDate() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return today.toLocaleDateString("en-US", options);
}

const api_url = import.meta.env.VITE_NEWS_API_URL;
const api_key = import.meta.env.VITE_NEWS_API_KEY;

export async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res) throw new Error("failed to fetch data");
  return res.json();
}

export async function fetchNews({
  category,
  query,
  pageSize = 20,
  type = "headlines", // "headlines" | "everything"
  language = "en",
}: {
  category?: string;
  query?: string;
  pageSize?: number;
  type?: "headlines" | "everything";
  language?: string | null;
}) {
  let endpoint = `${api_url}/${
    type === "headlines" ? "top-headlines" : "everything"
  }?apiKey=${api_key}&pageSize=${pageSize}`;

  if (category && type === "headlines") {
    endpoint += `&category=${encodeURIComponent(category)}`;
  }

  if (query) {
    endpoint += `&q=${encodeURIComponent(query)}`;
  }

  if (language) {
    endpoint += `&language=${encodeURIComponent(language)}`;
  }

  return fetchJson(endpoint);
}
