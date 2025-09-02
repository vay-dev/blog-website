import React, { useEffect, useRef, useState } from "react";
import "./styles/trending-news.scss";
import { useFetchNews } from "../../methods/useFetchNews";
import type { NewsArticle } from "../../interfaces/news-response.interface";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

interface TrendingCardProps {
  article: NewsArticle;
  className?: string;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({
  article,
  className,
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
      className={`trending-card ${className}`}
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
      <div className="image-con">
        <img
          src={article.urlToImage || "/no-image.jpg"}
          alt=""
          className="trending-card-image"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/api/placeholder/160/180";
          }}
        />
      </div>

      <div className="trending-card-content">
        <h3 className="trending-card-title " title={article.title}>
          {article.title}
        </h3>

        <p
          className="trending-card-description"
          title={article.description || "No description available"}
        >
          {article.description || "No description available"}
        </p>

        <div className="trending-card-meta">
          {article.source?.name && (
            <span className="trending-card-source">{article.source.name}</span>
          )}
          {article.publishedAt && (
            <time className="trending-card-time" dateTime={article.publishedAt}>
              {formatTimeAgo(article.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </article>
  );
};

const TrendingNews = () => {
  // embla api states
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [slidesCount, setSlidesCount] = useState<number>(0);

  // First ten carousel states
  const [firstTenIndex, setFirstTenIndex] = useState<number>(0);
  const [firstTenSlidesCount, setFirstTenSlidesCount] = useState<number>(0);

  // embla carousel activation
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true, skipSnaps: true }, [
    autoplay.current,
  ]);

  // second embla ref for first ten articles
  const autoplayFirstTen = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef2, emblaApi] = useEmblaCarousel(
    { dragFree: false, loop: true },
    [autoplayFirstTen.current]
  );

  const { data } = useFetchNews("latest", 100, "everything");

  // method for handling embla api
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setSlidesCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // First ten carousel effect
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setFirstTenIndex(emblaApi.selectedScrollSnap());
    };

    setFirstTenSlidesCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Early return AFTER all hooks have been called
  if (!data) return <p>No news available</p>;

  const firstTenArticles = data.articles.slice(0, 10);

  // Navigation functions for first ten
  const scrollPrevFirstTen = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNextFirstTen = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const handleCardClick = (article: NewsArticle) => {
    if (article.url) {
      window.open(article.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="trending-news">
      <h2 className="text-center mt-2">Trending News</h2>
      <div className="trending-news-container">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {data.articles.map((article, index) => (
              <div className="embla__slide" key={index}>
                <TrendingCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* First ten embla ref container with controls */}
      <div className="first-ten-news-container mt-5 m-auto">
        <div className="first-ten-header">
          <h3 className="first-ten-title">Top Stories</h3>
          <div className="first-ten-controls">
            <button
              className="first-ten-btn first-ten-btn--prev"
              onClick={scrollPrevFirstTen}
              aria-label="Previous article"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <span className="first-ten-counter">
              {firstTenIndex + 1} / {firstTenSlidesCount}
            </span>
            <button
              className="first-ten-btn first-ten-btn--next"
              onClick={scrollNextFirstTen}
              aria-label="Next article"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className="alt__embla" ref={emblaRef2}>
          <div className="alt__embla__container">
            {firstTenArticles.map((article, index) => (
              <div
                className="alt__embla__card"
                key={index}
                onClick={() => handleCardClick(article)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(article);
                  }
                }}
                aria-label={`Read article: ${article.title}`}
              >
                <div className="img-con">
                  <img
                    src={article.urlToImage || "/no-image.png"}
                    alt={article.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/no-image.png";
                    }}
                  />
                </div>
                <div className="content__con">
                  <h3 className="title" title={article.title}>
                    {article.title}
                  </h3>
                  <p
                    className="description"
                    title={article.description || "No description available"}
                  >
                    {article.description || "No description available"}
                  </p>
                  <div className="meta">
                    {article.source?.name && (
                      <span className="source">{article.source.name}</span>
                    )}
                    {article.publishedAt && (
                      <time className="time" dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </time>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="first-ten-dots">
          {Array.from({ length: firstTenSlidesCount }).map((_, index) => (
            <button
              key={index}
              className={`first-ten-dot ${
                index === firstTenIndex ? "active" : ""
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingNews;
