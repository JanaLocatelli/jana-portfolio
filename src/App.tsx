import { useEffect, useState } from "react";
import { translations } from "./i18n";
import { Header } from "./componets/Header";
import "./App.css";
import { getDarkMode, saveDarkMode } from "./hooks/userPreferences";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => getDarkMode());
  const [language, setLanguage] = useState<"en" | "pt">("en");

  const translation = translations[language];
  console.log("Current translation:", translation);

  //Persist theme across reloads
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDarkMode(saved === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  //Persist whenever user changes mode
  useEffect(() => {
    saveDarkMode(darkMode);
  }, [darkMode]);

  const toggleDarkModeWithAnimation = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const overlay = document.querySelector(
      ".theme-transition",
    ) as HTMLElement | null;

    if (!overlay) {
      setDarkMode((prev) => !prev);
      return;
    }

    overlay.style.setProperty("--x", `${e.clientX}px`);
    overlay.style.setProperty("--y", `${e.clientY}px`);

    overlay.classList.add("active");

    setTimeout(() => {
      setDarkMode((prev) => !prev);
      overlay.classList.remove("active");
    }, 350);
  };

  return (
    <>
      <div className="theme-transition" />

      <div className={darkMode ? "app dark" : "app light"}>
        <Header
          toggleLanguage={() =>
            setLanguage((lang) => (lang === "en" ? "pt" : "en"))
          }
          language={language}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkModeWithAnimation}
        />
        <div className="app">
          <header className="header">
            <h1>Janaina Ribeiro-Locatelli</h1>
            <p>Senior Software Engineer | Android & Full Stack</p>
          </header>

          <main>
            {/* <button
          onClick={() => {
            setLanguage((lang) => (lang === "en" ? "pt" : "en"));
            console.log("Current translation:", language);
          }}
        >
          {language}
        </button> */}
            <section id="about" className="section">
              <h2>About Me</h2>
              <p>
                I’m a Senior Software Engineer with 10+ years of experience,
                focused on Android development and building high-quality
                products. I’ve worked with embedded Android systems for cooking
                appliances and I love creating user-focused, reliable software.
              </p>
            </section>

            <section id="resume" className="section">
              <h2>Resume</h2>

              <p>You can download my resume here:</p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
              >
                Download Resume (PDF)
              </a>
            </section>

            <ul>
              <li>10+ years software development experience</li>
              <li>7 years Android (embedded & mobile)</li>
              <li>Senior Engineer at Whirlpool</li>
              <li>Strong in Java, Kotlin, C#, Python</li>
            </ul>
          </main>

          <footer className="footer">
            <p>© {new Date().getFullYear()} Janaina Ribeiro-Locatelli</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
