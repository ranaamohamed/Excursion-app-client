import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CiGlobe } from "react-icons/ci";
import { useTranslation, setLanguage, getLanguage } from "react-multi-lang";
import "./NavbarDropdown.scss";

const LanguageDropdown = () => {
  const t = useTranslation(); // Translation function (not directly used here but available for future use)

  // Get the saved language from localStorage or fallback to the default language
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("lang") || getLanguage()
  );

  // Loading state to prevent multiple changes or UI flickering
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle language change from dropdown
  const changeLang = (lang) => {
    // console.log("lang");
    if (lang !== currentLang && !isLoading) {
      //console.log("lang", lang);
      setCurrentLang(lang); // Update state
      setLanguage(lang); // Update library's language
      localStorage.setItem("lang", lang); // Persist in localStorage
      window.location.reload();
    }
  };

  // Available language options for the dropdown
  const languages = [
    { code: "en", name: "ENGLISH", nativeName: "English" },
    { code: "de", name: "GERMAN", nativeName: "German" },
  ];

  return (
    <Dropdown className="navbar-dropdown">
      {/* Dropdown toggle button (disabled if loading) */}
      <Dropdown.Toggle id="dropdown-basic" disabled={isLoading}>
        <div className="language-toggle-content">
          <CiGlobe className="globe-icon" />
        </div>
      </Dropdown.Toggle>

      {/* Dropdown menu aligned based on current text direction */}
      <Dropdown.Menu>
        {/* Render a dropdown item for each language */}
        {languages.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            href="#"
            className={`lang-item ${currentLang === lang.code ? "active" : ""}`}
            onClick={() => changeLang(lang.code)}
            disabled={currentLang === lang.code || isLoading}
          >
            <strong>{lang.name}</strong>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
