import "./styles/header.scss";
import CusBorder from "./border";
import { Globe, ChevronRight, Search, X } from "lucide-react";
import { getCurrentDate } from "../../methods/client";
import React, { useState, useEffect, useRef } from "react";
import CusLink from "../reuseable/link";
import { searchTerm$, searchTermResults$ } from "../../store/store";

interface CusSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClose: () => void;
}

const CusSearch = ({ searchTerm, setSearchTerm, onClose }: CusSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    searchTerm$.next(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    searchTerm$.next("");
    // Keep focus on input after clearing
    // searchTermResults$.next(null);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Auto-focus when component mounts
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100); // Small delay to ensure animation completes
  }, []);

  return (
    <div className="input-wrapper">
      <Search size={18} style={{ opacity: 0.5, flexShrink: 0 }} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck="false"
      />
      {searchTerm && (
        <button
          className="x-icon"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

const HeaderComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      // When closing, clear the search term
      setSearchTerm("");
      searchTerm$.next("");
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
    searchTerm$.next("");
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node) &&
        isSearchOpen
      ) {
        handleCloseSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSearchOpen) {
        handleCloseSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSearchOpen]);

  const navLinks = [
    { href: "/", label: "General" },
    { href: "/business", label: "Business" },
    { href: "/entertainment", label: "Entertainment" },
    { href: "/health", label: "Health" },
    { href: "/technology", label: "Technology" },
  ];

  return (
    <div>
      <CusBorder className="heading">
        <span className="date-con">
          <Globe size={20} />
          <span>{getCurrentDate()}</span>
        </span>

        <div className="the-menu">
          The menu
          <span>
            <ChevronRight size={20} />
          </span>
          <button
            className="search"
            onClick={handleSearchToggle}
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            type="button"
          >
            <Search size={20} />
          </button>
        </div>
      </CusBorder>

      <div
        ref={searchWrapperRef}
        className={`search-wrapper ${isSearchOpen ? "open" : ""}`}
      >
        <CusSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClose={handleCloseSearch}
        />
      </div>

      <div className="img-con">
        <img src="/vector.png" alt="Logo" className="mx-auto" id="image" />
      </div>

      {/* nav links below */}
      <CusBorder className="nav-links-wrapper">
        <div className="nav-links d-flex">
          {navLinks.map((link, index: number) => (
            <CusLink key={index} label={link.label} href={link.href} />
          ))}
        </div>
      </CusBorder>
    </div>
  );
};

export default HeaderComponent;
