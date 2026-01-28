import { useState } from "react";

type HeaderProps = {
  darkMode: boolean;
  toggleDarkMode: (e: React.MouseEvent<HTMLButtonElement>) => void;
  language: "en" | "pt";
  toggleLanguage: () => void;
};

export function Header({
  darkMode,
  toggleDarkMode,
  language,
  toggleLanguage,
}: HeaderProps) {
  const [modeAnimation, setModeAnimation] = useState(false);

  return (
    <header className="top-bar">
      <div className="left"></div>

      <div className="right">
        <button
          // onClick={() => {
          //   toggleDarkMode();
          //   setModeAnimation(true);
          //   setTimeout(() => setModeAnimation(false), 300);
          // }}
          onClick={toggleDarkMode}
          className="icon-btn"
        >
          <div className={`${modeAnimation ? "mode-icon" : ""}`}>
            {darkMode ? "🌞" : "🌙"}
          </div>
        </button>

        <button onClick={toggleLanguage} className="icon-btn">
          {language === "en" ? "US" : "BR"}
        </button>
      </div>
    </header>
  );
}
