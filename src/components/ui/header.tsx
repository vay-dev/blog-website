import "./styles/header.scss";
import CusBorder from "./border";
import { Globe, ChevronRight, Search, X } from "lucide-react";
import { getCurrentDate } from "../../methods/client";
import React, { useState, useEffect, useRef } from "react";
import CusLink from "../reuseable/link";
import {
  searchTerm$,
  searchTermResults$,
  isSearchActive$,
} from "../../store/store";

interface CusSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClose: () => void;
}

const CusSearch = ({ searchTerm, setSearchTerm, onClose }: CusSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchTerm$.next(value);
    // Set search as active when there's a search term
    isSearchActive$.next(value.length > 0);
  };

  const handleClear = () => {
    setSearchTerm("");
    searchTerm$.next("");
    isSearchActive$.next(false);
    searchTermResults$.next(null);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const handleSearchToggle = (e: any) => {
    e.stopPropagation();
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchTerm("");
      searchTerm$.next("");
      isSearchActive$.next(false);
      searchTermResults$.next(null);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
    searchTerm$.next("");
    isSearchActive$.next(false);
    searchTermResults$.next(null);
  };

  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node) &&
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "General" },
    { href: "/business", label: "Business" },
    { href: "/entertainment", label: "Entertainment" },
    { href: "/health", label: "Health" },
    { href: "/technology", label: "Technology" },
  ];

  return (
    <div>
      <CusBorder className={`heading ${isScrolled ? "fixed" : ""}`}>
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
            ref={searchButtonRef}
            onClick={(e) => handleSearchToggle(e)}
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

      <CusBorder className={`nav-links-wrapper ${isScrolled ? "fixed" : ""}`}>
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
