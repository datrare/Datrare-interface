import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import "./css/Footer.css";
import ThemeContext from "./context/ThemeContext";

function Footer() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <footer className={`footer ${isDarkMode ? "dark" : "light"}`}>
      <div className="footer-left">
        <p className="footer-text">CONNECT WITH US</p>
        <div className="footer-icons">
          <a href="https://twitter.com/DatRares" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="footer-icon" />
          </a>
          <a href="https://discord.gg/US5nAsC2KR" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDiscord} className="footer-icon" />
          </a>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-text">
          &copy; 2023 DatRares. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
