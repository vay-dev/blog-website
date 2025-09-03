import React from "react";
import "./styles/error.scss";

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | string;
  type?: "network" | "server" | "generic" | "notFound";
  showDetails?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  error,
  type = "generic",
  showDetails = false,
  onRetry,
  onGoHome,
  className = "",
}) => {
  // Default titles and messages based on error type
  const getDefaultContent = () => {
    switch (type) {
      case "network":
        return {
          title: "Connection Problem",
          message:
            "Unable to connect to the server. Please check your internet connection and try again.",
          icon: (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 12q0-2.925 2.038-4.962Q7.075 5 10 5q2.925 0 4.963 2.038Q17 9.075 17 12" />
              <path d="M21 12q0-4.425-3.088-7.513Q14.825 1.4 10.4 1.4q-4.425 0-7.513 3.087Q0 7.575 0 12" />
              <circle cx="12" cy="12" r="3" />
              <path d="m8.5 8.5 7 7" />
              <path d="m15.5 8.5-7 7" />
            </svg>
          ),
        };
      case "server":
        return {
          title: "Server Error",
          message:
            "Something went wrong on our end. Our team has been notified and is working on a fix.",
          icon: (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
              <line x1="6" x2="6.01" y1="6" y2="6" />
              <line x1="6" x2="6.01" y1="18" y2="18" />
              <path d="m15 6-3 3 3 3" />
              <path d="m15 18-3-3 3-3" />
            </svg>
          ),
        };
      case "notFound":
        return {
          title: "Page Not Found",
          message:
            "The page you're looking for doesn't exist or has been moved.",
          icon: (
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
              <line x1="9" x2="15" y1="9" y2="15" />
              <line x1="15" x2="9" y1="9" y2="15" />
            </svg>
          ),
        };
      default:
        return {
          title: "Something Went Wrong",
          message:
            "An unexpected error occurred. Please try refreshing the page.",
          icon: (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          ),
        };
    }
  };

  const defaultContent = getDefaultContent();
  const displayTitle = title || defaultContent.title;
  const displayMessage = message || defaultContent.message;

  const getErrorDetails = () => {
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message;
    return "Unknown error occurred";
  };

  return (
    <div className={`error-state error-state--${type} ${className}`}>
      <div className="error-state__container">
        <div className="error-state__icon">{defaultContent.icon}</div>
        <div className="error-state__content">
          <h2 className="error-state__title">{displayTitle}</h2>
          <p className="error-state__message">{displayMessage}</p>

          {showDetails && error && (
            <div className="error-state__details">
              <details>
                <summary>Error Details</summary>
                <code className="error-state__code">{getErrorDetails()}</code>
              </details>
            </div>
          )}

          <div className="error-state__actions">
            {onRetry && (
              <button
                className="error-state__button error-state__button--primary"
                onClick={onRetry}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
                Try Again
              </button>
            )}

            {onGoHome && (
              <button
                className="error-state__button error-state__button--secondary"
                onClick={onGoHome}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                Go Home
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
