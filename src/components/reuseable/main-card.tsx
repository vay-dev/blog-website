import React from "react";
import type { NewsArticle } from "../../interfaces/news-response.interface";
import "./styles/main-card.scss";

interface MainCardProps {
  article: NewsArticle;
  width?: string | number;
}

const MainCard: React.FC<MainCardProps> = ({ article }) => {
  if (!article) {
    console.error("MainCard received no article");
    return null;
  }

  return (
    <div className="main-card">
      <img
        src={article.urlToImage || "/no-image.jpg"}
        alt={article.title || "No title"}
        className="main-card-image"
      />
      <div className="main-card-shadow"></div>
      <div className="main-card-clip">
        <i className="ri-menu-4-line"></i>
      </div>

      <div className="content-con">
        <h1 className="content-con-title">{article.title || "N/A"}</h1>
        <p className="content-con-description">
          {article.description || "No description available."}
        </p>
        <div className="content-con-footer">
          <span className="source">{article.source?.name || "Unknown"}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
export default MainCard;
