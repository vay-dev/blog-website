import type { NewsArticle } from "../../interfaces/news-response.interface";
import NewsCard from "./page-card";
import "./styles/page.scss";

interface CusPageProps {
  articles: NewsArticle[];
  className?: string;
  selfClass?: string;
  variant?: "default" | "compact" | "featured";
  columns?: 1 | 2 | 3 | 4;
}

const CusPage = ({
  articles,
  className,
  selfClass,
  variant = "default",
  columns = 3,
}: CusPageProps) => {
  return (
    <div className={`container-fluid ${selfClass || ""}`}>
      <div className={`news-grid news-grid--${columns} px-3 pt-3`}>
        {articles.map((article, idx) => (
          <NewsCard
            key={idx}
            article={article}
            className={className}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};

export default CusPage;
