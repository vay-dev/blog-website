import React from "react";
import "./styles/empty.scss";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: "news" | "search" | "bookmark" | "generic";
  actionButton?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Content Available",
  message = "We couldn't find any content to display at the moment.",
  icon = "generic",
  actionButton,
  className = "",
}) => {
  const getIcon = () => {
    switch (icon) {
      case "news":
        return (
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8z" />
          </svg>
        );
      case "search":
        return (
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        );
      case "bookmark":
        return (
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        );
      default:
        return (
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m6-6h4a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2h-4m-6 0V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
            <path d="M9 7h6" />
          </svg>
        );
    }
  };

  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state__container">
        <div className="empty-state__icon">{getIcon()}</div>
        <div className="empty-state__content">
          <h3 className="empty-state__title">{title}</h3>
          <p className="empty-state__message">{message}</p>
          {actionButton && (
            <button
              className="empty-state__button"
              onClick={actionButton.onClick}
            >
              {actionButton.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
