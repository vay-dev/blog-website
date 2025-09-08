import React, { useState, useEffect } from "react";
import "./styles/top.scss";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <span
        className={`top-button ${isScrolled ? "visible" : ""}`}
        onClick={handleClick}
      >
        <ArrowUp size={30} />
      </span>
    </div>
  );
};

export default BackToTop;
