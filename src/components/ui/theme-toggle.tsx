"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita problemas de hidratação
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 fixed top-1 right-14 z-50 border-none cursor-pointer"
      aria-label="Alternar tema"
    >
      {theme === "dark" 
      ? <Sun /> 
      : <Moon />}
    </button>
  );
}