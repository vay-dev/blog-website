import { CircleArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import "./styles/section.scss";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  externalLink?: string;
  childrenClassName?: string;
  className?: string;
}

// ✅ Correct FC typing
const CusSection: React.FC<SectionProps> = ({
  title,
  children,
  externalLink,
  childrenClassName = "",
  className = "",
}) => {
  return (
    <div>
      <section className={`cus-section mb-5 ${className}`}>
        {/* header of the section */}
        <div className="header px-5">
          <h1 className="title">{title}</h1>

          {externalLink && (
            <Link to={externalLink} className="view-more">
              View More{" "}
              <span>
                <CircleArrowRight />
              </span>
            </Link>
          )}
        </div>
        {/* content of the section */}
        <div className={`section-content px-5 mt-2 w-100 ${childrenClassName}`}>
          {children}
        </div>
      </section>
    </div>
  );
};

export default CusSection;
