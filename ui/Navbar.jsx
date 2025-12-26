"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          Cooking Website
        </Link>

        <button
          className={`hamburger ${open ? "is-active" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>

        <ul className={`nav-menu ${open ? "open" : ""}`}>
          <li className="nav-item" onClick={() => setOpen(false)}>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item" onClick={() => setOpen(false)}>
            <Link href="/recipes" className="nav-link">
              Recipes
            </Link>
          </li>
          <li className="nav-item" onClick={() => setOpen(false)}>
            <Link href="/favorites" className="nav-link">
              Favorites
            </Link>
          </li>
          <li className="nav-item" onClick={() => setOpen(false)}>
            <Link href="/add" className="nav-link">
              Add Recipe
            </Link>
          </li>
        </ul>
      </div>

      <div className={`mobile-backdrop ${open ? "visible" : ""}`} onClick={() => setOpen(false)} />
    </nav>
  );
}
