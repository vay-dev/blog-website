import React from "react";
import type { NewsArticle } from "../../interfaces/news-response.interface";
import "./styles/page-card.scss";

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  className = "",
  variant = "default",
}) => {
  // Format time ago helper function
  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "";

    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - published.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return published.toLocaleDateString();
  };

  const handleCardClick = () => {
    if (article.url) {
      window.open(article.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      className={`news-card news-card--${variant} ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Read article: ${article.title}`}
    >
      <div className="news-card__image">
        <img
          src={article.urlToImage || "/no-image.jpg"}
          alt=""
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/no-image.jpg";
          }}
        />
      </div>

      <div className="news-card__content">
        <h3 className="news-card__title" title={article.title}>
          {article.title}
        </h3>

        {variant !== "compact" && (
          <p
            className="news-card__description"
            title={article.description || "No description available"}
          >
            {article.description || "No description available"}
          </p>
        )}

        <div className="news-card__meta">
          {article.source?.name && (
            <span className="news-card__source">{article.source.name}</span>
          )}
          {article.publishedAt && (
            <time className="news-card__time" dateTime={article.publishedAt}>
              {formatTimeAgo(article.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
