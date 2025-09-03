import TrendingNews, { TrendingCard } from "../components/ui/trending-news";
import CusSection from "../components/reuseable/section";
import { useEffect, useState } from "react";
import { useFetchNews } from "../methods/useFetchNews";
import type { NewsApiResponse } from "../interfaces/news-response.interface";
import MainCard from "../components/reuseable/main-card";
import "./styles/general.scss";

const GeneralPage = () => {
  const [worldNews, setWorldNews] = useState<NewsApiResponse | null>(null);
  const [technologyNews, setTechnologyNews] = useState<NewsApiResponse | null>(
    null
  );
  const [businessNews, setBusinessNews] = useState<NewsApiResponse | null>(
    null
  );
  const [entertainmentNews, setEntertainmentNews] =
    useState<NewsApiResponse | null>(null);
  const [healthNews, setHealthNews] = useState<NewsApiResponse | null>(null);

  // Fetch data for all sections
  const { data: worldData } = useFetchNews("all", 10, "headlines");
  const { data: technologyData } = useFetchNews("technology", 10, "headlines");
  const { data: businessData } = useFetchNews("business", 10, "headlines");
  const { data: entertainmentData } = useFetchNews(
    "entertainment",
    10,
    "headlines"
  );
  const { data: healthData } = useFetchNews("health", 10, "headlines");

  useEffect(() => {
    if (worldData?.articles) setWorldNews(worldData);
  }, [worldData]);

  useEffect(() => {
    if (technologyData?.articles) setTechnologyNews(technologyData);
  }, [technologyData]);

  useEffect(() => {
    if (businessData?.articles) setBusinessNews(businessData);
  }, [businessData]);

  useEffect(() => {
    if (entertainmentData?.articles) setEntertainmentNews(entertainmentData);
  }, [entertainmentData]);

  useEffect(() => {
    if (healthData?.articles) setHealthNews(healthData);
  }, [healthData]);

  // Helper function to render a news section safely
  const renderNewsSection = (
    sectionData: NewsApiResponse | null,
    title: string,
    externalLink: string,
    wrapperID: string,
    contentClassName: string
  ) => {
    if (!sectionData?.articles || sectionData.articles.length === 0) {
      return null;
    }

    const firstArticle = sectionData.articles[0];
    const remainingArticles = sectionData.articles.slice(1);

    return (
      <div id={wrapperID} className="container-fluid my-5">
        <CusSection
          title={title}
          externalLink={externalLink}
          childrenClassName={contentClassName}
        >
          <div className="row h-100 w-100 g-4 d-flex">
            {/* Main Card - Left Side */}
            {firstArticle && (
              <div className="col-md-8">
                <MainCard article={firstArticle} />
              </div>
            )}

            {/* Trending Cards - Right Side */}
            {remainingArticles.length > 0 && (
              <div className="col-md-4">
                <div className="trending-cards-container">
                  {remainingArticles.map((article, index) =>
                    article ? (
                      <TrendingCard key={index} article={article} />
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </CusSection>
      </div>
    );
  };

  return (
    <div>
      <TrendingNews />

      {/* World News Section */}
      {renderNewsSection(
        worldNews,
        "World News",
        "/technology",
        "worldnews-wrapper",
        "world-news-content"
      )}

      {/* Technology News Section */}
      {renderNewsSection(
        technologyNews,
        "Technology News",
        "/technology",
        "technology-wrapper",
        "technology-news-content"
      )}

      {/* Business News Section */}
      {renderNewsSection(
        businessNews,
        "Business News",
        "/business",
        "business-wrapper",
        "business-news-content"
      )}

      {/* Entertainment News Section */}
      {renderNewsSection(
        entertainmentNews,
        "Entertainment News",
        "/entertainment",
        "entertainment-wrapper",
        "entertainment-news-content"
      )}

      {/* Health News Section */}
      {renderNewsSection(
        healthNews,
        "Health News",
        "/health",
        "health-wrapper",
        "health-news-content"
      )}
    </div>
  );
};

export default GeneralPage;
