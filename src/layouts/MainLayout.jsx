import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BackToTop from "@/components/common/BackToTop";

export default function MainLayout() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const containerStyles = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-main transition-colors duration-300 selection:bg-primary/20 selection:text-primary">
      <header className="w-full bg-bg border-b border-surface-elevated sticky top-0 z-50 transition-colors">
        <div className={containerStyles}>
          <Navbar isDark={isDark} setIsDark={setIsDark} />
        </div>
      </header>

      <main className="grow w-full py-8">
        <div className={containerStyles}>
          <Outlet />
        </div>
      </main>

      <footer className="w-full bg-surface-card border-t border-surface-elevated mt-auto transition-colors">
        <div className={containerStyles}>
          <Footer />
        </div>
      </footer>

      <div id="back-to-top">
        <BackToTop />
      </div>
    </div>
  );
}
