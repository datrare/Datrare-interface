import React, { useState, useEffect, useContext } from "react";
import "./css/Header.css";
import { Link } from "react-router-dom";
import CollectionSearchBar from "./components/CollectionSearchBar/CollectionSearchBar";
import ThemeContext from "./context/ThemeContext";
import ThemeToggler from "./components/ThemeToggler/ThemeToggler";

function Header() {
    const [navActive, setNavActive] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    function toggleNav() {
        setNavActive(!navActive);
    }

    return (
        <header className={`${isDarkMode ? 'dark' : 'light'}`}>
            <Link to="/" style={{ textDecoration: "none" }}>
                <div
                    className="logo"
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                >
                    DatRare
                </div>
            </Link>
            <div className="search-bar-wrapper">
                <CollectionSearchBar />
            </div>
            <nav>
                <ul
                    className={navActive ? "nav-links nav-active" : "nav-links"}
                >
                    <li className="menu-search-bar">
                        <CollectionSearchBar />
                    </li>
                    <li>
                        <a className="nav-link" href="/" onClick={toggleNav}>
                            Home
                        </a>
                    </li>
                    <li>
    <a className="nav-link"
        href="/upcomingnft"
        rel="noopener noreferrer"
        onClick={toggleNav}
    >
        Upcoming NFT
    </a>
</li>

                    <li>
                        <a className="nav-link"
                            href="https://forms.gle/WcNGoKf3hFf1oNkUA"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={toggleNav}
                        >
                            List Your project
                        </a>
                    </li>
                    <li>
                        <a className="nav-link"
                            href="https://datrare.gitbook.io/whitepaper/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={toggleNav}
                        >
                            Docs
                        </a>
                    </li>
                    
                    <li><ThemeToggler /></li>
                </ul>
                <div className="burger" onClick={toggleNav}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
