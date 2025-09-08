import React from "react";
import type {
  NewsApiResponse,
  NewsArticle,
} from "../interfaces/news-response.interface";
import CusPage from "../components/reuseable/page";

interface SearchResultsProps {
  articles: NewsArticle[];
  classname?: string;
  columns?: 1 | 2 | 3 | 4;
  containerClassName?: string;
  selfClass?: string;
  results?: string;
}

const SearchResultsPage = ({
  articles,
  classname,
  containerClassName,
  columns,
  selfClass,
  results,
}: SearchResultsProps) => {
  return (
    <div className={` ${containerClassName}`}>
      {results && (
        <h1 className="mb-3 fw-bold ">
          Results for <span className="results">{results}</span>
        </h1>
      )}
      <CusPage
        columns={columns}
        articles={articles}
        variant="compact"
        selfClass={selfClass}
        className={classname}
      />
    </div>
  );
};

export default SearchResultsPage;
