import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-300 hover:bg-accent"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className={`w-4 h-4 transition-all duration-300 ${
        isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
      }`} />
      <Moon className={`w-4 h-4 absolute transition-all duration-300 ${
        isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
      }`} />
    </Button>
  );
};

export default ThemeToggle;